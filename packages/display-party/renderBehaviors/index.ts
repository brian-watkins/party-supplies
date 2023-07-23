import { validate } from "esbehavior"
import mountBehavior from "./mount.behavior.js"
import patchBehavior from "patch.behavior.js"
import listReorderBehavior from "listReorder.behavior.js"
import listRemoveBehavior from "listRemove.behavior.js"

window.validateBehaviors = () => {
  return validate([
    mountBehavior,
    patchBehavior,
    listRemoveBehavior,
    listReorderBehavior
  ], { failFast: true })
}