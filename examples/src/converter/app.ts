import { Meta, use } from "@spheres/store";
import { celsiusInvalid, celsiusTemperature, farenheitInvalid, farenheitTemperature, temperatureUpdate } from "./state.js";
import { names, useValue } from "../helpers/helpers.js";
import { View, htmlView } from "@spheres/display";


export function converter(): View {
  return htmlView().main(el => {
    el.children
      .div(el => {
        el.children
          .label(el => {
            el.config.for("celsius")
            el.children.textNode("Celsius")
          })
          .zone(celsiusInput)
      })
      .div(el => {
        el.children
          .label(el => {
            el.config.for("farenheit")
            el.children.textNode("Farenheit")
          })
          .zone(farenheitInput)
      })
  })
}

function celsiusInput(): View {
  return htmlView().input(el => {
    el.config
      .id("celsius")
      .type("text")
      .value((get) => get(celsiusTemperature))
      .on("input", useValue((value) => use(temperatureUpdate, { celsius: value })))
      .class((get) => inputStyling(get(celsiusInvalid), isError(get(celsiusTemperature.meta))))
  })
}

function farenheitInput(): View {
  return htmlView().input(el => {
    el.config
      .id("farenheit")
      .type("text")
      .value((get) => get(farenheitTemperature))
      .on("input", useValue((value) => use(temperatureUpdate, { farenheit: value })))
      .class((get) => inputStyling(get(farenheitInvalid), isError(get(farenheitTemperature.meta))))
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

function isError(meta: Meta<any, any>): boolean {
  return meta.type === "error"
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