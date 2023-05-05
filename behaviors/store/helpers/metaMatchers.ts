import { Meta } from "@src/store"
import { equalTo, Matcher } from "great-expectations"

export function pendingMessage<M>(message: M): Matcher<Meta<any>> {
  return equalTo<Meta<any>>({
    type: "pending",
    message
  })
}

export function okMessage<M>(message: M): Matcher<Meta<any>> {
  return equalTo<Meta<any>>({
    type: "ok",
    message
  })
}

export function initMessage<T>(value: T): Matcher<Meta<any>> {
  return equalTo<Meta<any>>({
    type: "initialValue",
    value
  })
}
