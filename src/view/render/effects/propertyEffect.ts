import { GetState } from "../../../store/index.js";
import { Stateful } from "../virtualNode.js";

export class UpdatePropertyEffect {
  constructor(private element: Element, private property: string, private generator: Stateful<string>) { }

  init(get: GetState): void {
    const val = this.generator(get)
    if (val !== undefined) {
      //@ts-ignore
      this.element[this.property] = val
    }
  }

  run(get: GetState): void {
    if (!this.element.isConnected) {
      return
    }

    // @ts-ignore
    this.element[this.property] = this.generator(get) ?? ""
  }
}
