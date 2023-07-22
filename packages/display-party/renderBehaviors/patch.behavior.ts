import { addAttribute, makeVirtualElement, makeVirtualTextNode, virtualNodeConfig } from "@src/vdom/virtualNode.js";
import { behavior, effect, example, fact, step } from "esbehavior";
import { equalTo, expect, is, resolvesTo } from "great-expectations";
import { selectElement, selectElementWithText } from "helpers/displayElement.js";
import { renderContext } from "helpers/renderContext.js";

export default behavior("patch", [
  example(renderContext())
    .description("the text is patched")
    .script({
      suppose: [
        fact("a node with text", (context) => {
          context.mount(makeVirtualTextNode("Hello!"))
        })
      ],
      perform: [
        step("the node is patched with different text", (context) => {
          context.patch(makeVirtualTextNode("YO YO YO!"))
        })
      ],
      observe: [
        effect("the updated text is rendered", async () => {
          await expect(selectElementWithText("YO YO YO!").exists(), resolvesTo(equalTo(true)))
        })
      ]
    }),
  example(renderContext())
    .description("the attributes are patched")
    .script({
      suppose: [
        fact("an element with attributes is mounted", (context) => {
          const config = virtualNodeConfig()
          addAttribute(config, "data-stuff", "17")
          addAttribute(config, "data-other-stuff", "22")
          context.mount(makeVirtualElement("p", config, [
            makeVirtualTextNode("Here is some thing!")
          ]))
        })
      ],
      perform: [
        step("the element is patched", (context) => {
          const config = virtualNodeConfig()
          addAttribute(config, "data-stuff", "23")
          addAttribute(config, "class", "text-lg")
          context.patch(makeVirtualElement("p", config, [
            makeVirtualTextNode("Here is some thing!")
          ]))
        })
      ],
      observe: [
        effect("the patched element is displayed", async () => {
          await expect(selectElement(".text-lg[data-stuff='23']").text(),
            resolvesTo(equalTo("Here is some thing!")))
          
          await expect(selectElement("[data-other-stuff='22']").exists(),
            resolvesTo(equalTo(false)))
        })
      ]
    }),
  example(renderContext())
    .description("child text is patched")
    .script({
      suppose: [
        fact("mount element with child text", (context) => {
          const config = virtualNodeConfig()
          addAttribute(config, "data-stuff", "99")
          context.mount(makeVirtualElement("p", config, [
            makeVirtualTextNode("Here is some thing!")
          ]))
        })
      ],
      perform: [
        step("update the child text", (context) => {
          const config = virtualNodeConfig()
          addAttribute(config, "data-stuff", "99")
          context.patch(makeVirtualElement("p", config, [
            makeVirtualTextNode("Here are some other things!")
          ]))
        })
      ],
      observe: [
        effect("the text is updated", async () => {
          await expect(selectElement("[data-stuff='99']").text(),
            resolvesTo(equalTo("Here are some other things!")))
        })
      ]
    })
])