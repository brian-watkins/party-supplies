import { View, htmlView } from "@src/index.js"

export interface InputAppProps {
  defaultInputValue: string
}

export default function(context: InputAppProps): View {
  return htmlView()
    .div(el => {
      el.children
        .input(el => {
          el.config
            .dataAttribute("with-default")
            .value(context.defaultInputValue)
            .disabled(false)
        })
        .input(el => {
          el.config
            .dataAttribute("disabled")
            .disabled(true)
        })
    })
}