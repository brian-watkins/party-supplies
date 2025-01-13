import { didCreateToken } from "./stateRecorder.js";
import { GetState, State, StateListener, StatePublisher, TokenRegistry, createPublisher, initListener } from "../tokenRegistry.js";

export interface DerivedStateInitializer<T> {
  id?: string
  query: (get: GetState) => T
  name?: string
}

export function derived<T>(initializer: DerivedStateInitializer<T> | ((get: GetState) => T)): DerivedState<T> {
  const token = typeof initializer === "function" ?
    new DerivedState(undefined, undefined, initializer) :
    new DerivedState(initializer.id, initializer.name, initializer.query)
  didCreateToken(token)
  return token
}


export class DerivedState<T> extends State<T> {
  constructor(id: string | undefined, name: string | undefined, private derivation: (get: GetState) => T) {
    super(id, name)
  }

  [createPublisher](registry: TokenRegistry): StatePublisher<T> {
    const publisher = new DerivedStatePublisher(registry, this.derivation)
    initListener(publisher)
    return publisher
  }
}

class DerivedStatePublisher<T> extends StatePublisher<T> implements StateListener {
  private _value!: T

  constructor(public registry: TokenRegistry, private derivation: (get: GetState) => T) {
    super()
  }

  init(get: GetState): void {
    this._value = this.derivation(get)
  }

  run(get: GetState): void {
    const derived = this.derivation(get)

    if (Object.is(derived, this._value)) {
      return
    }

    this._value = derived

    this.runListeners()
  }

  getValue(): T {
    return this._value
  }
}