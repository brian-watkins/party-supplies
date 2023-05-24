import { ConfigurableExample, behavior, effect, example, fact, step } from "esbehavior";
import { arrayWith, arrayWithItemAt, equalTo, expect, is } from "great-expectations";
import { TestProvider } from "./helpers/testProvider.js";
import { okMessage, pendingMessage } from "./helpers/metaMatchers.js";
import { testStoreContext } from "./helpers/testStore.js";
import { Container, Provider, Value, container, pending, value } from "@src/index.js";

interface ProvidedValueContext {
  receiver: Value<string>
  provider: TestProvider
}

const simpleProvidedValue: ConfigurableExample =
  example(testStoreContext<ProvidedValueContext>())
    .description("view with simple provided value")
    .script({
      suppose: [
        fact("there is a view with a provided value", (context) => {
          const receiver = value({
            query: () => "initial"
          })
          const provider = new TestProvider()
          provider.setHandler(async (_, set, waitFor) => {
            set(receiver.meta, pending("loading"))
            const value = await waitFor()
            set(receiver, value)
          })
          context.useProvider(provider)
          context.setTokens({
            receiver,
            provider
          })
        }),
        fact("there is a subscriber", (context) => {
          context.subscribeTo(context.tokens.receiver, "sub-one")
        }),
        fact("there is a meta subscriber", (context) => {
          context.subscribeTo(context.tokens.receiver.meta, "meta-sub")
        })
      ],
      observe: [
        effect("the subscriber receives the initial message", (context) => {
          expect(context.valuesForSubscriber("sub-one"), is(equalTo([
            "initial"
          ])))
        }),
        effect("the meta subscriber receives a pending message", (context) => {
          expect(context.valuesForSubscriber("meta-sub"), is(arrayWith([
            pendingMessage("loading")
          ])))
        })
      ]
    }).andThen({
      perform: [
        step("the provided value loads", (context) => {
          context.tokens.provider.resolver?.("funny")
        })
      ],
      observe: [
        effect("the subscriber receives the provided value", (context) => {
          expect(context.valuesForSubscriber("sub-one"), is(equalTo([
            "initial",
            "funny"
          ])))
        }),
        effect("the meta subscriber receives an ok message", (context) => {
          expect(context.valuesForSubscriber("meta-sub"), is(arrayWith([
            pendingMessage("loading"),
            okMessage()
          ])))
        })
      ]
    })

interface ProvidedValueWithKeyContext {
  profileState: Container<string>,
  pageNumberState: Container<number>,
  receiver: Container<string>
  provider: TestProvider
}

const providedValueWithDerivedKey: ConfigurableExample =
  example(testStoreContext<ProvidedValueWithKeyContext>())
    .description("provided value with derived key")
    .script({
      suppose: [
        fact("there is a view with a provided value", (context) => {
          const profileState = container({ initialValue: "profile-1" })
          const pageNumberState = container({ initialValue: 17 })
          const receiver = container<string>({ initialValue: "initial" })
          const provider = new TestProvider()
          provider.setHandler(async (get, set, waitFor) => {
            const key = {
              profileId: get(profileState),
              page: get(pageNumberState)
            }
            set(receiver.meta, pending(`Value for profile ${key.profileId} on page ${key.page}`))
            const extraValue = await waitFor()
            set(receiver, `Value: ${extraValue} for profile ${key.profileId} on page ${key.page}`)
          })
          context.useProvider(provider)
          context.setTokens({
            profileState,
            pageNumberState,
            receiver,
            provider
          })
        }),
        fact("there is a subscriber", (context) => {
          context.subscribeTo(context.tokens.receiver, "sub-one")
        }),
        fact("there is a meta-subscriber", (context) => {
          context.subscribeTo(context.tokens.receiver.meta, "meta-sub")
        })
      ],
      observe: [
        effect("the current key is used", (context) => {
          expect(context.valuesForSubscriber("sub-one"), is(equalTo([
            "initial",
          ])))
        }),
        effect("the meta subscriber gets the pending message", (context) => {
          expect(context.valuesForSubscriber("meta-sub"), is(arrayWith([
            pendingMessage("Value for profile profile-1 on page 17"),
          ])))
        })
      ]
    }).andThen({
      perform: [
        step("the provided value loads", (context) => {
          context.tokens.provider.resolver?.("Fun Stuff")
        }),
        step("the key changes", (context) => {
          context.writeTo(context.tokens.profileState, "profile-7")
        })
      ],
      observe: [
        effect("the receiver gets the written value", (context) => {
          expect(context.valuesForSubscriber("sub-one"),
            is(equalTo([
              "initial",
              "Value: Fun Stuff for profile profile-1 on page 17"
            ])))
        }),
        effect("the meta subscriber gets the pending message again", (context) => {
          expect(context.valuesForSubscriber("meta-sub"), is(arrayWith([
            pendingMessage("Value for profile profile-1 on page 17"),
            okMessage(),
            pendingMessage("Value for profile profile-7 on page 17")
          ])))
        })
      ]
    }).andThen({
      perform: [
        step("another subscriber joins", (context) => {
          context.subscribeTo(context.tokens.receiver, "sub-two")
        })
      ],
      observe: [
        effect("the subscriber gets the latest written value", (context) => {
          expect(context.valuesForSubscriber("sub-two"), is(equalTo([
            "Value: Fun Stuff for profile profile-1 on page 17"
          ])))
        })
      ]
    }).andThen({
      perform: [
        step("the provided value is updated", (context) => {
          context.tokens.provider.resolver?.("Even more fun stuff!")
        })
      ],
      observe: [
        effect("subscriber-one gets the update", (context) => {
          expect(context.valuesForSubscriber("sub-one"),
            is(equalTo([
              "initial",
              "Value: Fun Stuff for profile profile-1 on page 17",
              "Value: Even more fun stuff! for profile profile-7 on page 17"
            ])))
        }),
        effect("subscriber-two gets the update", (context) => {
          expect(context.valuesForSubscriber("sub-two"),
            is(equalTo([
              "Value: Fun Stuff for profile profile-1 on page 17",
              "Value: Even more fun stuff! for profile profile-7 on page 17"
            ])))
        }),
        effect("the meta subscriber gets the ok message", (context) => {
          expect(context.valuesForSubscriber("meta-sub"), is(arrayWith([
            pendingMessage("Value for profile profile-1 on page 17"),
            okMessage(),
            pendingMessage("Value for profile profile-7 on page 17"),
            okMessage()
          ])))
        })
      ]
    }).andThen({
      perform: [
        step("a third subscriber joins", (context) => {
          context.subscribeTo(context.tokens.receiver, "sub-three")
        }),
        step("a state dependency is updated", (context) => {
          context.writeTo(context.tokens.pageNumberState, 21)
        })
      ],
      observe: [
        effect("subscriber-one receives no message yet", (context) => {
          expect(context.valuesForSubscriber("sub-one"),
            is(equalTo([
              "initial",
              "Value: Fun Stuff for profile profile-1 on page 17",
              "Value: Even more fun stuff! for profile profile-7 on page 17"
            ])))
        }),
        effect("subscriber-two receives no message yet", (context) => {
          expect(context.valuesForSubscriber("sub-two"),
            is(equalTo([
              "Value: Fun Stuff for profile profile-1 on page 17",
              "Value: Even more fun stuff! for profile profile-7 on page 17"
            ])))
        }),
        effect("the third subscriber gets the latest written value", (context) => {
          expect(context.valuesForSubscriber("sub-three"),
            is(equalTo([
              "Value: Even more fun stuff! for profile profile-7 on page 17"
            ])))
        }),
        effect("the meta subscriber gets the loading message again", (context) => {
          expect(context.valuesForSubscriber("meta-sub"), is(arrayWith([
            pendingMessage("Value for profile profile-1 on page 17"),
            okMessage(),
            pendingMessage("Value for profile profile-7 on page 17"),
            okMessage(),
            pendingMessage("Value for profile profile-7 on page 21")
          ])))
        })
      ]
    })

interface StatefulProviderContext {
  counterState: Container<string>
  otherState: Container<number>
  provider: Provider
}

const reactiveQueryCountForProvider: ConfigurableExample =
  example(testStoreContext<StatefulProviderContext>())
    .description("reactive query count for provider")
    .script({
      suppose: [
        fact("there is some state and a provider", (context) => {
          const counterState = container<string>({ initialValue: "0" })
          const otherState = container({ initialValue: 27 })
          const anotherState = container({ initialValue: 22 })
          const provider = new TestProvider()
          let counter = 0
          provider.setHandler(async (get, set, _) => {
            counter = counter + 1
            const total = get(otherState) + get(anotherState)
            set(counterState, `${counter} - ${total}`)
          })
          context.useProvider(provider)
          context.setTokens({
            counterState,
            otherState,
            provider
          })
        }),
        fact("there is a subscriber", (context) => {
          context.subscribeTo(context.tokens.counterState, "sub-one")
        })
      ],
      observe: [
        effect("the reactive query is executed only once on initialization", (context) => {
          expect(context.valuesForSubscriber("sub-one"), is(equalTo([
            "1 - 49"
          ])))
        })
      ]
    })
    .andThen({
      perform: [
        step("a state dependency is updated", (context) => {
          context.writeTo(context.tokens.otherState, 14)
        })
      ],
      observe: [
        effect("the reactive query is executed once more", (context) => {
          expect(context.valuesForSubscriber("sub-one"), is(arrayWithItemAt(1, equalTo("2 - 36"))))
        })
      ]
    })


interface DeferredDependencyContext {
  numberState: Container<number>,
  stringState: Container<string>,
  managedState: Container<string>
  provider: TestProvider
}

const deferredDependency: ConfigurableExample =
  example(testStoreContext<DeferredDependencyContext>())
    .description("dependency that is not used on first execution")
    .script({
      suppose: [
        fact("there is derived state with a dependency used only later", (context) => {
          const numberState = container({ initialValue: 6 })
          const stringState = container({ initialValue: "hello" })
          const managedState = container<string>({ initialValue: "initial" })
          const provider = new TestProvider()
          provider.setHandler(async (get, set, _) => {
            if (get(stringState) === "now") {
              set(managedState, `Number ${get(numberState)}`)
            } else {
              set(managedState, `Number 0`)
            }
          })
          context.useProvider(provider)
          context.setTokens({
            numberState,
            stringState,
            managedState,
            provider
          })
        }),
        fact("there is a subscriber", (context) => {
          context.subscribeTo(context.tokens.managedState, "sub-one")
        })
      ],
      perform: [
        step("the state is updated to expose the number", (context) => {
          context.writeTo(context.tokens.stringState, "now")
        }),
        step("the number state updates", (context) => {
          context.writeTo(context.tokens.numberState, 27)
        }),
        step("the string state updates to hide the number state", (context) => {
          context.writeTo(context.tokens.stringState, "later")
        }),
        step("the number state updates again, which does not result in a new value", (context) => {
          context.writeTo(context.tokens.numberState, 14)
        })
      ],
      observe: [
        effect("the subscriber gets all the updates", (context) => {
          expect(context.valuesForSubscriber("sub-one"), is(equalTo([
            "Number 0",
            "Number 6",
            "Number 27",
            "Number 0"
          ])))
        })
      ]
    })

export default behavior("state provider", [
  simpleProvidedValue,
  providedValueWithDerivedKey,
  reactiveQueryCountForProvider,
  deferredDependency
])