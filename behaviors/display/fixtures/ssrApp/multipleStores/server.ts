import * as View from "@src/display/index.js"
import { Store } from "@src/store/index.js";
import viewGenerator from "./view.js"
import { render } from "@src/display";

const store = new Store()

export default function() {
  return render(store, View.div([], [
    View.div([View.id("fragment-a")], [viewGenerator()]),
    View.div([View.id("fragment-b")], [viewGenerator()]),
  ]))
}