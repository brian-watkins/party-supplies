import * as View from "@src/display/index.js"
import counterIsland from "../islands/counter.js"
import tallyIsland from "../islands/tally.js"

export default function (): View.View {
  return View.div([], [
    View.h1([], [
      View.text("This is the click counter!")
    ]),
    counterIsland,
    View.hr([], []),
    tallyIsland,
    View.hr([], []),
    tallyIsland
  ])
}

