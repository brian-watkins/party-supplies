import { GetState } from "../../../store/index.js";
import { ArgsController } from "../index.js";
import { Stateful } from "../virtualNode.js";
import { EffectWithArgs } from "./effectWithArgs.js";

export class UpdatePropertyEffect extends EffectWithArgs {
  constructor(private element: Element, private property: string, private generator: Stateful<string>, argsController: ArgsController | undefined, args: any) {
    super(argsController, args)
  }

  init(get: GetState): void {
    this.setArgs()
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

    this.setArgs()
    // @ts-ignore
    this.element[this.property] = this.generator(get) ?? ""
  }
}
