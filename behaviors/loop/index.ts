import { validate } from "esbehavior"
import stateProviderBehavior from "./stateProvider.behavior"
import stateWriterBehavior from "./stateWriter.behavior"
import stateBehavior from "./state.behavior"
import unsubscribeBehavior from "./unsubscribe.behavior"
import collectionBehavior from "./collection.behavior"
import ruleBehavior from "./rule.behavior"
import updateContainerBehavior from "./updateContainer.behavior"
import metaBehavior from "./meta.behavior"

window.validateBehaviors = () => {
  return validate([
    stateBehavior,
    metaBehavior,
    stateProviderBehavior,
    stateWriterBehavior,
    ruleBehavior,
    unsubscribeBehavior,
    updateContainerBehavior,
    // collectionBehavior
  ], { failFast: true })
}