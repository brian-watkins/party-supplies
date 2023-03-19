import { loop, State, state } from "../index.js";
import { Display } from "./display.js";
import { View, viewGenerator } from "./view.js";

export * from "./view.js"
export * from "./display.js"

export function display(view: View): Display {
  return new Display(loop(), view)
}

export function component(generator: (get: <S>(state: State<S>) => S) => View, key?: string): View {
  return viewGenerator(state(generator), key)
}
