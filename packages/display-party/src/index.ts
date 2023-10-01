export * from "./display.js"
export * from "./view.js"
export type { SpecialAttributes } from "./viewConfig.js"
export * from "./htmlElements.js"

export function inputValue(event: Event): string {
  return (<HTMLInputElement>event.target).value
}