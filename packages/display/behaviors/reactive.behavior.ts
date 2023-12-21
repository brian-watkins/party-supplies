import { Context, behavior, effect, example, fact, step } from "esbehavior";
import { assignedWith, equalTo, expect, is, resolvesTo, stringContaining } from "great-expectations";
import { TestAppController } from "helpers/testAppController.js";

export default (context: Context<TestAppController>) => behavior("reactive elements", [

  example(context)
    .description("reactive text")
    .script({
      suppose: [
        fact("there is a view with reactive text", async (controller) => {
          await controller.loadApp("reactiveCounter.app")
        })
      ],
      perform: [
        step("the button is clicked three times", async (controller) => {
          await controller.display.select("button").click()
          await controller.display.select("button").click()
          await controller.display.select("button").click()
          await controller.display.select("button").click()
        })
      ],
      observe: [
        effect("the click counter is updated", async (context) => {
          const counterText = await context.display.select("[data-click-count]").text()
          expect(counterText, is(stringContaining("4 times")))
        })
      ]
    }),

  example(context)
    .description("reactive attributes")
    .script({
      suppose: [
        fact("there is a view with reactive attributes", async (controller) => {
          await controller.loadApp("reactiveAttributes.app")
        })
      ],
      perform: [
        step("click the button", async (controller) => {
          await controller.display.select("button[data-action='increment']").click()
        })
      ],
      observe: [
        effect("the classes change", async (controller) => {
          const classes = await controller.display.select("#title").attribute("class")
          expect(classes, is(assignedWith(equalTo("off"))))
        })
      ]
    }).andThen({
      perform: [
        step("click the button", async (controller) => {
          await controller.display.select("button[data-action='increment']").click()
        })
      ],
      observe: [
        effect("the classes change again", async (controller) => {
          const classes = await controller.display.select("#title").attribute("class")
          expect(classes, is(assignedWith(equalTo("on"))))
        })
      ]
    }),

  example(context)
    .description("reactive boolean attribute")
    .script({
      suppose: [
        fact("there is a view with reactive boolean attributes", async (controller) => {
          await controller.loadApp("reactiveAttributes.app")
        })
      ],
      observe: [
        effect("the checkbox is checked and enabled", async (controller) => {
          const isChecked = await controller.display.select("input[type='checkbox']").isChecked()
          expect(isChecked, is(equalTo(true)), "the element is checked")
          const isDisabled = await controller.display.select("input[type='checkbox']").isDisabled()
          expect(isDisabled, is(equalTo(false)), "the element is enabled")
        })
      ]
    }).andThen({
      perform: [
        step("click the button to disable", async (controller) => {
          await controller.display.select("button[data-action='disable']").click()
        })
      ],
      observe: [
        effect("the checkbox is not checked and disabled", async (controller) => {
          const isChecked = await controller.display.select("input[type='checkbox']").isChecked()
          expect(isChecked, is(equalTo(false)), "the element is not checked")
          const isDisabled = await controller.display.select("input[type='checkbox']").isDisabled()
          expect(isDisabled, is(equalTo(true)), "the element is disabled")
        })
      ]
    }),

  example(context)
    .description("reactive aria attribute")
    .script({
      suppose: [
        fact("there is a view with reactive aria attributes", async (controller) => {
          await controller.loadApp("reactiveAttributes.app")
        })
      ],
      observe: [
        effect("the attribute has the initial value", async (controller) => {
          await expect(controller.display.select("input").attribute("aria-disabled"), resolvesTo(assignedWith(equalTo("false"))))
        })
      ]
    }).andThen({
      perform: [
        step("click the button to disable", async (controller) => {
          await controller.display.select("button[data-action='disable']").click()
        })
      ],
      observe: [
        effect("the attribute value is updated", async (controller) => {
          await expect(controller.display.select("input").attribute("aria-disabled"), resolvesTo(assignedWith(equalTo("true"))))
        })
      ]
    }),

  example(context)
    .description("reactive data attribute")
    .script({
      suppose: [
        fact("there is a view with reactive data attributes", async (controller) => {
          controller.loadApp("reactiveAttributes.app")
        })
      ],
      observe: [
        effect("the data attribute has the default value", async (controller) => {
          const dataValue = await controller.display.select("#title").attribute("data-click-counter")
          expect(dataValue, is(assignedWith(equalTo("0"))))
        })
      ]
    }).andThen({
      perform: [
        step("click the button", async (controller) => {
          await controller.display.select("button[data-action='increment']").click()
          await controller.display.select("button[data-action='increment']").click()
          await controller.display.select("button[data-action='increment']").click()
        })
      ],
      observe: [
        effect("the data attribute is updated", async (controller) => {
          const dataValue = await controller.display.select("#title").attribute("data-click-counter")
          expect(dataValue, is(assignedWith(equalTo("3"))))
        })
      ]
    }),

  example(context)
    .description("reactive custom attribute")
    .script({
      suppose: [
        fact("there is a view with reactive custom attributes", async (controller) => {
          controller.loadApp("reactiveAttributes.app")
        })
      ],
      observe: [
        effect("the custom attribute has the default value", async (controller) => {
          const dataValue = await controller.display.select("#title").attribute("weirdness")
          expect(dataValue, is(assignedWith(equalTo("0"))))
        })
      ]
    }).andThen({
      perform: [
        step("click the button", async (controller) => {
          await controller.display.select("button[data-action='increment']").click()
          await controller.display.select("button[data-action='increment']").click()
          await controller.display.select("button[data-action='increment']").click()
        })
      ],
      observe: [
        effect("the custom attribute is updated", async (controller) => {
          const value = await controller.display.select("#title").attribute("weirdness")
          expect(value, is(assignedWith(equalTo("3"))))
        })
      ]
    })

])