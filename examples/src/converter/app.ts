import { celsiusInvalid, celsiusTemperature, farenheitInvalid, farenheitTemperature, temperatureUpdate } from "./state.js";
import { names, useValue } from "../helpers/helpers.js";
import { HTMLBuilder } from "../../../src/view/index.js";


export function converter(root: HTMLBuilder) {
  root.main(el => {
    el.children
      .div(el => {
        el.children
          .label(el => {
            el.config.for("celsius")
            el.children.textNode("Celsius")
          })
          .subview(celsiusInput)
      })
      .div(el => {
        el.children
          .label(el => {
            el.config.for("farenheit")
            el.children.textNode("Farenheit")
          })
          .subview(farenheitInput)
      })
  })
}


function celsiusInput(root: HTMLBuilder) {
  root.input(el => {
    el.config
      .id("celsius")
      .type("text")
      .value((get) => get(celsiusTemperature))
      .on("input", useValue((value) => temperatureUpdate({ celsius: value })))
      .class((get) => inputStyling(get(celsiusInvalid), get(farenheitInvalid)))
  })
}


function farenheitInput(root: HTMLBuilder) {
  root.input(el => {
    el.config
      .id("farenheit")
      .type("text")
      .value((get) => get(farenheitTemperature))
      .on("input", useValue((value) => temperatureUpdate({ farenheit: value })))
      .class((get) => inputStyling(get(farenheitInvalid), get(celsiusInvalid)))
  })
}


function inputStyling(isInvalid: boolean, isError: boolean): string {
  let classNames = textInputClasses()

  if (isInvalid) {
    classNames = classNames.concat(invalidInputClasses())
  } else if (isError) {
    classNames = classNames.concat(errorInputClasses())
  }

  return names(classNames)
}

function invalidInputClasses(): Array<string> {
  return [
    "bg-fuchsia-300"
  ]
}

function errorInputClasses(): Array<string> {
  return [
    "bg-slate-300"
  ]
}

function textInputClasses(): Array<string> {
  return [
    "border-2",
    "p-1",
    "m-4"
  ]
}
