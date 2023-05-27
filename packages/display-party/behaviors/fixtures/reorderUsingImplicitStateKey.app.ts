import { selection, container, store, GetState, State } from "state-party";
import * as View from "@src/index.js"

interface Person {
  name: string
  age: number
}

function person(name: string): Person {
  return {
    name,
    age: name.length
  }
}

const ticker = container({ initialValue: 1 })
const coolPerson = container({ initialValue: person("Cool Dude") })
const awesomePerson = container({ initialValue: person("Fundamentally Awesome") })
const happyPerson = container({ initialValue: person("Happy Animal") })

const people = container({
  initialValue: [
    coolPerson,
    awesomePerson,
    happyPerson
  ]
})

const shiftPeopleSelection = selection(people, ({ current }) => {
  const first = current.shift()
  if (!first) {
    return current
  }
  return [ ...current, first ]
})

const incrementTicker = selection(ticker, ({ current }) => {
  return current + 1
})

const peopleView = (get: GetState) => {
  const list = get(people)

  return View.div([], [
    View.h1([], [View.text(`There are ${list.length} people!`)]),
    View.button([
      View.data("reorder"),
      View.onClick(() => store(shiftPeopleSelection))
    ], [View.text("Reorder People")]),
    View.button([
      View.data("increment-ticker"),
      View.onClick(() => store(incrementTicker))
    ], [View.text("Increment")]),
    View.hr([], []),
    View.ul([], list.map(personView))
  ])
}

function personView(person: State<Person>): View.View {
  return View.withState({ key: person }, get =>
    View.li([], [
      View.h1([View.data("person")], [
        View.text(`${get(person).name} is ${get(person).age} years old: ${get(ticker)}`)
      ])
    ])
  )
}

export default function (): View.View {
  return View.div([
    View.id("reorder-list")
  ], [
    View.withState(peopleView)
  ])
}