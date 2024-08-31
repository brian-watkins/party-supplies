import { container, derived, reactiveVariable, variable } from "@src/index";
import { Container, DerivedState, ReactiveVariable, Variable } from "@src/store";
import { behavior, effect, example, fact, step } from "esbehavior";
import { expect, is } from "great-expectations";
import { testStoreContext } from "helpers/testStore";

interface VariableStateContext {
  stringContainer: Container<string>
  variable: Variable<string>
  query: DerivedState<string>
}

interface ReactiveVariableContext {
  stringContainer: Container<string>
  proxiedContainer: Container<number>
  anotherProxiedContainer: Container<number>
  variable: ReactiveVariable<number>
}

export default behavior("variable state", [

  example(testStoreContext<VariableStateContext>())
    .description("Updating variable state")
    .script({
      suppose: [
        fact("there is a container", (context) => {
          context.setTokens({
            stringContainer: container({ initialValue: "hello" }),
            variable: variable({ initialValue: "Initial Variable Value" }),
            query: derived({ query: (get) => `${get(context.tokens.variable)} - ${get(context.tokens.stringContainer)}` })
          })
        }),
        fact("there is a subscriber to the derived state", (context) => {
          context.subscribeTo(context.tokens.query, "sub-1")
        })
      ],
      observe: [
        effect("the initial value of the variable is used", (context) => {
          expect(context.valuesForSubscriber("sub-1"), is([
            "Initial Variable Value - hello"
          ]))
        })
      ]
    }).andThen({
      perform: [
        step("the variable is updated", (context) => {
          context.tokens.variable.assignValue("A New Variable Value")
        })
      ],
      observe: [
        effect("the subscriber is not notified of the change", (context) => {
          expect(context.valuesForSubscriber("sub-1"), is([
            "Initial Variable Value - hello"
          ]))
        })
      ]
    }).andThen({
      perform: [
        step("the derived query is updated due to a change in another dependency", (context) => {
          context.writeTo(context.tokens.stringContainer, "NEXT!")
        })
      ],
      observe: [
        effect("the derived query reflects the latest value of the variable", (context) => {
          expect(context.valuesForSubscriber("sub-1"), is([
            "Initial Variable Value - hello",
            "A New Variable Value - NEXT!"
          ]))
        })
      ]
    }),

  example(testStoreContext<ReactiveVariableContext>())
    .description("reactive variable")
    .script({
      suppose: [
        fact("there is a variable container that holds state", (context) => {
          const proxiedContainer = container({ initialValue: 27 })
          context.setTokens({
            stringContainer: container({ initialValue: "hello" }),
            proxiedContainer,
            anotherProxiedContainer: container({ initialValue: 0 }),
            variable: reactiveVariable({ initialValue: proxiedContainer }),
          })
        }),
        fact("there is a subscriber to the derived state", (context) => {
          context.subscribeTo(context.tokens.variable, "sub-1")
        })
      ],
      observe: [
        effect("the initial value of the reactive variable is used", (context) => {
          expect(context.valuesForSubscriber("sub-1"), is([
            27
          ]))
        })
      ]
    }).andThen({
      perform: [
        step("the proxied state is updated", (context) => {
          context.writeTo(context.tokens.proxiedContainer, 14)
        })
      ],
      observe: [
        effect("the subscriber is updated with the new query value", (context) => {
          expect(context.valuesForSubscriber("sub-1"), is([
            27,
            14
          ]))
        })
      ]
    }).andThen({
      perform: [
        step("the reactive variable is assigned a new token", (context) => {
          context.tokens.variable.assignState(context.tokens.anotherProxiedContainer)
        }),
        step("there is another subscriber to the query", (context) => {
          context.subscribeTo(context.tokens.variable, "sub-2")
        })
      ],
      observe: [
        effect("the first subscriber does not get any update", (context) => {
          expect(context.valuesForSubscriber("sub-1"), is([
            27,
            14
          ]))
        }),
        effect("the second subscriber gets the initial value based on the new state", (context) => {
          expect(context.valuesForSubscriber("sub-2"), is([
            0
          ]))
        })
      ]
    }).andThen({
      perform: [
        step("the newly proxied container value is updated", (context) => {
          context.writeTo(context.tokens.anotherProxiedContainer, 99)
        })
      ],
      observe: [
        effect("the second subscriber is updated with the new query value", (context) => {
          expect(context.valuesForSubscriber("sub-2"), is([
            0,
            99
          ]))
        }),
        effect("the first subscriber does not get any update", (context) => {
          expect(context.valuesForSubscriber("sub-1"), is([
            27,
            14
          ]))
        })
      ]
    })

])