import { behavior, effect, example, fact, step } from "esbehavior";
import { equalTo, expect, is, stringContaining } from "great-expectations";
import { container, state, withDerivedValue, withInitialValue } from "@src/index.js";
import { Container, State } from "@src/loop.js";
import * as View from "@src/display/index.js"
import { testAppContext } from "./helpers/testApp.js";


interface TestData {
  peopleState: Container<Array<{ name: string, age: number }>>
  peopleView: State<View.View>
}

const simpleViewBehavior =
  example(testAppContext<TestData>())
    .description("Rendering a simple view")
    .script({
      suppose: [
        fact("some data is provided for the view", (testApp) => {
          const peopleState = container(withInitialValue([
            { name: "Cool Dude", age: 41 },
            { name: "Awesome Person", age: 28 }
          ]))
          const peopleView = state(withDerivedValue((get) => {
            const people = get(peopleState)
            return View.ul([], people.map(person => {
              return View.li([View.data("person")], [
                `${person.name} - ${person.age}`
              ])
            }))
          }))
          testApp.setState({
            peopleState,
            peopleView
          })
        }),
        fact("the view is rendered", (testApp) => {
          const view = View.div([], [
            View.p([], [
              "Here is some text"
            ]),
            View.viewGenerator(testApp.state.peopleView)
          ])

          testApp.setView(view)
          testApp.start()
        })
      ],
      observe: [
        effect("the data is rendered on the screen", async (testApp) => {
          const texts = testApp.display.elementsMatching("[data-person]").map((element) => element.text())
          expect(texts, is(equalTo([
            "Cool Dude - 41",
            "Awesome Person - 28"
          ])))
        })
      ]
    }).andThen({
      perform: [
        step("the root state is updated", (testApp) => {
          testApp.updateState(testApp.state.peopleState, [
            { name: "Fun Person", age: 99 }
          ])
        })
      ],
      observe: [
        effect("the updated view is rendered", async (testApp) => {
          const texts = testApp.display.elementsMatching("[data-person]").map((element) => element.text())
          expect(texts, is(equalTo([
            "Fun Person - 99",
          ])))
        })
      ]
    })

interface TestDataMulti {
  name: Container<string>
  age: Container<number>
  nameView: State<View.View>,
  ageView: State<View.View>
}

const multipleViewsBehavior =
  example(testAppContext<TestDataMulti>())
    .description("multiple views")
    .script({
      suppose: [
        fact("some state is provided for the view", (testApp) => {
          const nameState = container(withInitialValue("hello"))
          const ageState = container(withInitialValue(27))
          testApp.setState({
            name: nameState,
            age: ageState,
            nameView: state(withDerivedValue((get) => {
              return View.p([View.data("name")], [
                `My name is: ${get(nameState)}`
              ])
            })),
            ageView: state(withDerivedValue((get) => {
              return View.p([View.data("age")], [
                `My age is: ${get(ageState)}`
              ])
            }))
          })
        }),
        fact("the view is rendered", (testApp) => {
          const view = View.div([], [
            View.h1([], ["This is only a test!"]),
            View.viewGenerator(testApp.state.nameView),
            View.viewGenerator(testApp.state.ageView)
          ])

          testApp.setView(view)
          testApp.start()
        })
      ],
      observe: [
        effect("it displays the name and age", (testApp) => {
          const nameText = testApp.display.elementMatching("[data-name]").text()
          expect(nameText, is(stringContaining("hello")))

          const ageText = testApp.display.elementMatching("[data-age]").text()
          expect(ageText, is(stringContaining("27")))
        })
      ]
    }).andThen({
      perform: [
        step("the name state is update", (testApp) => {
          testApp.updateState(testApp.state.name, "Cool Dude")
        })
      ],
      observe: [
        effect("the updated name is displayed", (testApp) => {
          const nameText = testApp.display.elementMatching("[data-name]").text()
          expect(nameText, is(stringContaining("Cool Dude")))

          const ageText = testApp.display.elementMatching("[data-age]").text()
          expect(ageText, is(stringContaining("27")))
        })
      ]
    })

const nestedViewsBehavior =
  example(testAppContext<TestDataMulti>())
    .description("nested views")
    .script({
      suppose: [
        fact("some state is provided for the view", (testApp) => {
          const nameState = container(withInitialValue("hello"))
          const ageState = container(withInitialValue(27))
          const ageView = state(withDerivedValue((get) => {
            return View.p([View.data("age")], [
              `My age is: ${get(ageState)}`
            ])
          }))
          testApp.setState({
            name: nameState,
            age: ageState,
            nameView: state(withDerivedValue((get) => {
              const name = get(nameState)
              let children = [
                View.p([View.data("name")], [
                  `My name is: ${name}`
                ])
              ]
              if (name !== "AGELESS PERSON") {
                children.push(View.viewGenerator(ageView))
              }
              return View.div([], children)
            })),
            ageView
          })
        }),
        fact("the view is rendered", (testApp) => {
          const view = View.div([], [
            View.h1([], ["This is only a test!"]),
            View.viewGenerator(testApp.state.nameView),
          ])

          testApp.setView(view)
          testApp.start()
        })
      ],
      observe: [
        effect("it displays the name and age", (testApp) => {
          const nameText = testApp.display.elementMatching("[data-name]").text()
          expect(nameText, is(stringContaining("hello")))

          const ageText = testApp.display.elementMatching("[data-age]").text()
          expect(ageText, is(stringContaining("27")))
        })
      ]
    })
    .andThen({
      perform: [
        step("the name state is updated", (testApp) => {
          testApp.updateState(testApp.state.name, "Fun Person")
        })
      ],
      observe: [
        effect("the updated name is displayed", (testApp) => {
          const nameText = testApp.display.elementMatching("[data-name]").text()
          expect(nameText, is(stringContaining("Fun Person")))

          const ageText = testApp.display.elementMatching("[data-age]").text()
          expect(ageText, is(stringContaining("27")))
        })
      ]
    })
    .andThen({
      perform: [
        step("the age state is updated", (testApp) => {
          testApp.updateState(testApp.state.age, 33)
        })
      ],
      observe: [
        effect("the updated age is displayed", (testApp) => {
          const ageText = testApp.display.elementMatching("[data-age]").text()
          expect(ageText, is(stringContaining("33")))
        })
      ]
    })
    .andThen({
      perform: [
        step("the nested view is removed", (testApp) => {
          testApp.updateState(testApp.state.name, "AGELESS PERSON")
        })
      ],
      observe: [
        effect("the age is not present", (testApp) => {
          const ageIsVisible = testApp.display.hasElementMatching("[data-age]")
          expect(ageIsVisible, is(equalTo(false)))
        })
      ]
    })
    .andThen({
      perform: [
        step("the nested view is recreated", (testApp) => {
          testApp.updateState(testApp.state.name, "FUNNY PERSON")
        })
      ],
      observe: [
        effect("the age is present once again with the current state", (testApp) => {
          const nameText = testApp.display.elementMatching("[data-name]").text()
          expect(nameText, is(stringContaining("FUNNY PERSON")))

          const ageText = testApp.display.elementMatching("[data-age]").text()
          expect(ageText, is(stringContaining("33")))
        })
      ]
    })


export default behavior("view", [
  simpleViewBehavior,
  multipleViewsBehavior,
  nestedViewsBehavior,
])