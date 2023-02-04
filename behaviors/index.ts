import { validate } from "esbehavior"
import eventBehavior from "./event.behavior"
import managedStateBehavior from "./managedState.behavior"
import managedUpdateBehavior from "./managedUpdate.behavior"
import stateBehavior from "./state.behavior"
import viewBehavior from "./view.behavior"

window.validateBehaviors = () => {
  return validate([
    stateBehavior,
    viewBehavior,
    eventBehavior,
    managedStateBehavior,
    managedUpdateBehavior
  ], { failFast: true })
}