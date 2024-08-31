import { container, State, write } from "@spheres/store";
import { HTMLView } from "@src/htmlViewBuilder";
import { HTMLBuilder } from "@src/index";

interface Fruit {
  name: string
}

type FruitMessage = "shift" | "swap"

const fruitState = container<Array<Fruit>, FruitMessage>({
  initialValue: [
    { name: "apple" },
    { name: "grapes" },
    { name: "dragonfruit" }
  ],
  update(message, current) {
    switch (message) {
      case "shift":
        return { value: [ current[1], current[2], current[0] ] }
      case "swap":
        return { value: [ current[0], current[2], current[1] ] }
    }
  },
})

export default function (root: HTMLBuilder) {
  root.main(el => {
    el.children
      .button(el => {
        el.config
          .dataAttribute("shift-elements")
          .on("click", () => write(fruitState, "shift"))
        el.children
          .textNode("Click me to shift the fruit!")
      })
      .button(el => {
        el.config
          .dataAttribute("swap-elements")
          .on("click", () => write(fruitState, "swap"))
        el.children
          .textNode("Click me to swap the fruit!")
      })
      .hr()
      .ul(el => {
        el.children
          .zones((get) => get(fruitState), fruitView)
      })
  })
}

// const fruitView = htmlTemplate((withArgs: WithArgs<Fruit>) => root => {
//   root.li(el => {
//     el.children.textNode(withArgs(fruit => fruit.name))
//   })
// })

function fruitView(item: State<Fruit>, index: State<number>): HTMLView {
  return root => {
    root.li(el => {
      el.children.textNode(get => `${get(item).name} is at index ${get(index)}`)
    })
  }
}