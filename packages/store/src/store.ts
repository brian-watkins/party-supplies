import { ContainerController, StateListener } from "./controller.js"
import { StoreError } from "./error.js"
import { Meta, error, ok, pending } from "./meta.js"

export type GetState = <S, N = S>(state: State<S, N>) => S
export type Stateful<T> = (get: GetState) => T | undefined

export interface ProviderActions {
  get: GetState
  set: <Q, M>(state: State<Q, M>, value: M) => void
}

export interface Provider {
  provide(actions: ProviderActions): void
}

export interface WriterActions<T, M, E> {
  get: GetState
  ok(value: M): void
  pending(value: M): void
  error(value: M, reason: E): void
  current: T
}

export interface Writer<T, M = T, E = unknown> {
  write(message: M, actions: WriterActions<T, M, E>): Promise<void>
}

export interface Effect {
  run(get: GetState): void
}

export interface QueryActions<T> {
  get: GetState,
  current: T
}

export interface SelectionActions<T> {
  get: GetState,
  current: T
}

export interface WriteMessage<T, M = T> {
  type: "write"
  container: Container<T, M>
  value: M
}

export interface ResetMessage<T, M = T> {
  type: "reset"
  container: Container<T, M>
}

export interface RunMessage {
  type: "run"
  effect: () => void
}

export interface Rule<Argument = undefined> {
  readonly definition: (get: GetState, input: Argument) => StoreMessage<any>
}

export interface UseMessage {
  type: "use"
  rule: Rule<any>
  input: any
}

export interface BatchMessage {
  type: "batch"
  messages: Array<StoreMessage<any>>
}

export type StoreMessage<T, M = T> = WriteMessage<T, M> | ResetMessage<T, M> | UseMessage | BatchMessage | RunMessage

const registerState = Symbol("registerState")
const getController = Symbol("getController")
const initialValue = Symbol("initialValue")
const registryKey = Symbol("registryKey")

type StoreRegistryKey = State<any> | {}

export abstract class State<T, M = T> {
  constructor(readonly name: string | undefined) { }

  abstract [registerState](store: Store): ContainerController<T, M>

  get [registryKey](): StoreRegistryKey {
    return this
  }

  get meta(): MetaState<T, M, any> {
    return new MetaState(this)
  }

  toString() {
    return this.name ?? "State"
  }
}

export class MetaState<T, M, E = unknown> extends State<Meta<M, E>> {
  private static keys: WeakMap<StoreRegistryKey, StoreRegistryKey> = new WeakMap()

  constructor(private token: State<T, M>) {
    super(`meta[${token.toString()}]`)

    if (!MetaState.keys.has(this.token[registryKey])) {
      MetaState.keys.set(this.token[registryKey], {})
    }
  }

  get [registryKey](): StoreRegistryKey {
    return MetaState.keys.get(this.token[registryKey])!
  }

  [registerState](store: Store): ContainerController<Meta<M, E>> {
    const tokenController = store[getController](this.token)

    const controller = new ContainerController<Meta<M, E>>(ok(), (val) => val)

    tokenController.setMeta(controller)

    return controller
  }
}

abstract class AbstractReactiveQuery implements StateListener {
  private dependencies: WeakSet<State<any>> = new WeakSet()

  constructor(protected store: Store) { }

  protected getValue<S, N>(state: State<S, N>): S {
    const controller = this.store[getController](state)
    if (!this.dependencies.has(state)) {
      this.dependencies.add(state)
      controller.addListener(this)
    }
    return controller.value
  }

  abstract update(): void
}

export class Container<T, M = T> extends State<T, M> {
  private static idMap: Map<string, {}> = new Map()
  private key: StoreRegistryKey

  constructor(
    readonly id: string | undefined,
    name: string | undefined,
    private initialValue: T,
    private reducer: ((message: M, current: T) => T) | undefined,
    private query: ((actions: QueryActions<T>, nextValue?: M) => M) | undefined
  ) {
    super(name && id ? `${name}-${id}` : (name ?? id))

    if (id) {
      if (!Container.idMap.has(id)) {
        Container.idMap.set(id, {})
      }
      this.key = Container.idMap.get(id)!
    } else {
      this.key = this
    }
  }

  get [registryKey](): StoreRegistryKey {
    return this.key
  }

  get [initialValue](): T {
    return this.initialValue
  }

  [registerState](store: Store): ContainerController<T, M> {
    const containerController = new ContainerController(this.initialValue, this.reducer)

    if (!this.query) {
      return containerController
    }

    const reactiveQuery = new ReactiveContainerQuery(store, this, this.query)

    containerController.setQuery((current, next) => {
      return reactiveQuery.run(current, next)
    })

    try {
      containerController.writeValue(reactiveQuery.run(this.initialValue, undefined))
    } catch (err: any) {
      queueMicrotask(() => {
        store[getController](this.meta).writeValue(error(undefined, err))
      })
    }

    return containerController
  }
}

class ReactiveContainerQuery<T, M> extends AbstractReactiveQuery {
  constructor(store: Store, private state: State<T, M>, private query: ((actions: QueryActions<T>, nextValue?: M) => M)) {
    super(store)
  }

  update(): void {
    try {
      const containerController = this.store[getController](this.state)
      containerController.writeValue(this.run(containerController.value, undefined))
    } catch (err) {
      this.store[getController](this.state.meta).writeValue(error(undefined, err))
    }
  }

  run(currentValue: T, nextValue: M | undefined): M {
    return this.query({ get: (state) => this.getValue(state), current: currentValue }, nextValue)
  }
}

export class Value<T, M = T> extends State<T, M> {
  constructor(name: string | undefined, private derivation: (get: GetState, current: T | undefined) => M, private reducer: ((message: M, current: T | undefined) => T) | undefined) {
    super(name)
  }

  [registerState](store: Store): ContainerController<T, M> {
    const reactiveQuery = new ReactiveValue(store, this, this.derivation)

    let initialValue: T
    if (this.reducer) {
      initialValue = this.reducer(reactiveQuery.run(undefined), undefined)
    } else {
      try {
        initialValue = reactiveQuery.run(undefined) as unknown as T
      } catch (err) {
        const e = new StoreError(`Unable to initialize value: ${this.toString()}`)
        e.cause = err
        throw e
      }
    }

    return new ContainerController(initialValue, this.reducer)
  }
}

class ReactiveValue<T, M> extends AbstractReactiveQuery {
  constructor(store: Store, private state: State<any>, private definition: (get: GetState, current: T | undefined) => M) {
    super(store)
  }

  update(): void {
    const derivedController = this.store[getController](this.state)
    try {
      derivedController.publishValue(this.run(derivedController.value))
    } catch (err) {
      this.store[getController](this.state.meta).writeValue(error(undefined, err))
    }
  }

  run(currentValue: T | undefined): M {
    return this.definition((state) => this.getValue(state), currentValue)
  }
}

export interface EffectHandle {
  unsubscribe(): void
}

class ReactiveEffect extends AbstractReactiveQuery implements EffectHandle {
  constructor(store: Store, private effect: Effect) {
    super(store)
  }

  update() {
    this.effect.run((state) => this.getValue(state))
  }

  unsubscribe() {
    this.effect = {
      run: () => {
        // do nothing
      }
    }
  }
}

class ReactiveProvider extends AbstractReactiveQuery {
  constructor(store: Store, private provider: Provider) {
    super(store)
  }

  setValue<Q, M>(state: State<Q, M>, value: M) {
    this.store[getController](state).publishValue(value)
  }

  update(): void {
    this.provider.provide({
      get: (state) => this.getValue(state),
      set: (state, value) => this.setValue(state, value)
    })
  }
}

export type RegisterStateHook = (token: State<any>) => void

export class Store {
  private registry: WeakMap<StoreRegistryKey, ContainerController<any, any>> = new WeakMap();
  private registerStateHook: RegisterStateHook | undefined

  [getController]<T, M>(token: State<T, M>): ContainerController<T, M> {
    const key = token[registryKey]
    let controller = this.registry.get(key)
    if (controller === undefined) {
      controller = token[registerState](this)
      this.registry.set(key, controller)
      this.registerStateHook?.(token)
    }
    return controller
  }

  onRegisterState(handler: RegisterStateHook) {
    this.registerStateHook = handler
  }

  useEffect(effect: Effect): EffectHandle {
    const reactiveEffect = new ReactiveEffect(this, effect)
    reactiveEffect.update()
    return reactiveEffect
  }

  useProvider(provider: Provider) {
    const reactiveProvider = new ReactiveProvider(this, provider)
    reactiveProvider.update()
  }

  useWriter<T, M, E = unknown>(token: State<T, M>, writer: Writer<T, M, E>) {
    const controller = this[getController](token)

    controller.setWriter((value) => {
      writer.write(value, {
        get: (state) => {
          return this[getController](state).value
        },
        ok: (value) => {
          controller.publishValue(value)
        },
        pending: (message) => {
          this[getController](token.meta).publishValue(pending(message))
        },
        error: (message, reason) => {
          this[getController](token.meta).publishValue(error(message, reason))
        },
        current: controller.value
      }).catch((err) => {
        this[getController](token.meta).publishValue(error(value, err))
      })
    })
  }

  dispatch(message: StoreMessage<any>) {
    switch (message.type) {
      case "write":
        try {
          this[getController](message.container).updateValue(message.value)
        } catch (err) {
          this[getController](message.container.meta).writeValue(error(message.value, err))
        }
        break
      case "reset":
        this.dispatch({
          type: "write",
          container: message.container,
          value: message.container[initialValue]
        })
        break
      case "use":
        const get: GetState = (state) => this[getController](state).value
        const result = message.rule.definition(get, message.input)
        this.dispatch(result)
        break
      case "run":
        message.effect()
        break
      case "batch":
        for (let i = 0; i < message.messages.length; i++) {
          this.dispatch(message.messages[i])
        }
        break
    }
  }
}
