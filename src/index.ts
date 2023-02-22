import { Container, Loop, Provider, State, Writer, WriteValueMessage } from "./loop.js"
export { Loop } from "./loop.js"
export type { Container, State, Provider, Writer } from "./loop.js"

export interface ContainerInitializer<T, M = T> extends StateInitializer<T> {
  initialize(loop: Loop): Container<T, M>
}

export interface StateInitializer<T> {
  initialize(loop: Loop): State<T>
}

export function withInitialValue<T>(value: T): ContainerInitializer<T> {
  return {
    initialize: (loop) => {
      return loop.createContainer(value, (val) => val)
    }
  }
}

export function withDerivedValue<T>(derivation: (get: <S>(state: State<S>) => S) => T): StateInitializer<T> {
  return {
    initialize: (loop) => {
      return loop.deriveContainer(derivation)
    }
  }
}

let mainLoop: Loop = new Loop()

export function loop(): Loop {
  return mainLoop
}

export function container<T>(initializer: ContainerInitializer<T>): Container<T> {
  return initializer.initialize(loop())
}

export function state<T>(initializer: StateInitializer<T>): State<T> {
  return initializer.initialize(loop())
}

export function useProvider(provider: Provider) {
  loop().registerProvider(provider)
}

export function useWriter<T>(container: Container<T>, writer: Writer<T>) {
  loop().registerWriter(container, writer)
}

export function writeMessage<T, M>(container: Container<T, M>, value: M): WriteValueMessage<T, M> {
  return {
    type: "write",
    value,
    state: container
  }
}
