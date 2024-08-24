import { HTMLBuilder } from "@src/index.js";
import { view } from "./withState.js"

export default function (root: HTMLBuilder) {
  root.div(el => {
    el.children
      .h1(el => {
        el.children.textNode("THis is the click counter!")
      })
      .zone(view)
  })
}

