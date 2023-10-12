import { Context, behavior, effect, example, fact, step } from "esbehavior";
import { expect, resolvesTo } from "great-expectations";
import { TestCirclesApp } from "./helpers/testApp.js";
import { testCircle } from "./helpers/fakeCircle.js";

export default (context: Context<TestCirclesApp>) => behavior("Adjust Radius", [

  example(context)
    .description("closing the dialog")
    .script({
      suppose: [
        fact("the app is rendered", async (context) => {
          await context.renderAppWithCircles([
            testCircle(50, 50)
          ])
        })
      ],
      perform: [
        step("the dialog is opened", async (context) => {
          await context.display.openDialogForCircleCenteredAt(50, 50)
        })
      ],
      observe: [
        effect("the dialog is visible", async (context) => {
          await expect(context.display.selectElement("dialog").isVisible(), resolvesTo(true))
        })
      ]
    }).andThen({
      perform: [
        step("click outside the dialog", async (context) => {
          await context.display.selectElement("body").click({ x: 2, y: 2 })
        })
      ],
      observe: [
        effect("the dialog is closed", async (context) => {
          await expect(context.display.selectElement("dialog").isVisible(), resolvesTo(false))
        })
      ]
    }),

  example(context)
    .description("adjust radius of existing circle")
    .script({
      suppose: [
        fact("there are some circles", async (context) => {
          await context.renderAppWithCircles([
            testCircle(100, 120),
            testCircle(320, 200)
          ])
        })
      ],
      observe: [
        effect("the radius for both circles is 20 by default", async (context) => {
          await expect(context.display.circleCenteredAt(100, 120).radius, resolvesTo(20))
          await expect(context.display.circleCenteredAt(320, 200).radius, resolvesTo(20))
        })
      ]
    }).andThen({
      perform: [
        step("open the dialog for the circle", async (context) => {
          await context.display.openDialogForCircleCenteredAt(320, 200)
        }),
        step("open the diameter input", async (context) => {
          await context.display.openRadiusInputForCircleCenteredAt(320, 200)
        }),
        step("Adjust diameter to 90 for one circle", async (context) => {
          await context.display.radiusInput.setValue("45")
        })
      ],
      observe: [
        effect("the radius for the adjusted circle is 45", async (context) => {
          await expect(context.display.circleCenteredAt(320, 200).radius, resolvesTo(45))
        }),
        effect("the radius for the other circle is unaffected", async (context) => {
          await expect(context.display.circleCenteredAt(100, 120).radius, resolvesTo(20))
        })
      ]
    }).andThen({
      perform: [
        step("close the dialog", async (context) => {
          await context.display.closeDialog()
        }),
        step("click to open the dialog for the other circle", async (context) => {
          await context.display.openDialogForCircleCenteredAt(100, 120)
        }),
        step("Reveal diameter input", async (context) => {
          await context.display.openRadiusInputForCircleCenteredAt(100, 120)
        }),
        step("Adjust diameter to 90 for one circle", async (context) => {
          await context.display.radiusInput.setValue("8")
        })
      ],
      observe: [
        effect("the radius for the adjusted circle is 16", async (context) => {
          await expect(context.display.circleCenteredAt(100, 120).radius, resolvesTo(8))
        }),
        effect("the radius for the other circle is still 45", async (context) => {
          await expect(context.display.circleCenteredAt(320, 200).radius, resolvesTo(45))
        })
      ]
    })

])