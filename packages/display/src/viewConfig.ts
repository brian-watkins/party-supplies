import { StoreMessage } from "@spheres/store"
import { AriaAttribute, booleanAttributes } from "./htmlElements.js"
import { Stateful, VirtualNodeConfig, addAttribute, addProperty, addStatefulAttribute, addStatefulProperty, setEventHandler, virtualNodeConfig } from "./vdom/virtualNode.js"
import { svgAttributeNames } from "./svgElements.js"

export interface SpecialAttributes<Context> {
  attribute(name: string, value: string | Stateful<string, Context>): this
  dataAttribute(name: string, value?: string | Stateful<string, Context>): this
  innerHTML(html: string | Stateful<string, Context>): this
  aria(name: AriaAttribute, value: string | Stateful<string, Context>): this
  on<E extends keyof HTMLElementEventMap | string>(event: E, handler: (evt: E extends keyof HTMLElementEventMap ? HTMLElementEventMap[E] : Event, context: Context) => StoreMessage<any>): this
}

export class BasicElementConfig implements SpecialAttributes<any> {
  protected config: VirtualNodeConfig = virtualNodeConfig()

  recordAttribute(attribute: string, value: string | Stateful<string>) {
    if (typeof value === "function") {
      addStatefulAttribute(this.config, attribute, value)
    } else {
      addAttribute(this.config, attribute, value)
    }
    return this
  }

  recordBooleanAttribute(attribute: string, isSelected: boolean | Stateful<boolean>) {
    if (typeof isSelected === "function") {
      addStatefulAttribute(this.config, attribute, (get) => isSelected(get, undefined) ? attribute : undefined)
    } else {
      if (isSelected) {
        addAttribute(this.config, attribute, attribute)
      }
    }
    return this
  }

  recordBooleanProperty(name: string, isSelected: boolean | Stateful<boolean>) {
    if (typeof isSelected === "function") {
      addStatefulProperty(this.config, name, (get) => isSelected(get, undefined) ? name : undefined)
    } else {
      if (isSelected) {
        addProperty(this.config, name, name)
      }
    }
    return this
  }

  innerHTML(html: string | Stateful<string>): this {
    if (typeof html === "function") {
      addStatefulProperty(this.config, "innerHTML", html)
    } else {
      addProperty(this.config, "innerHTML", html)
    }

    return this
  }

  attribute(name: string, value: string | Stateful<string>) {
    if (typeof value === "function") {
      addStatefulAttribute(this.config, name, value)
    } else {
      addAttribute(this.config, name, value)
    }

    return this
  }

  dataAttribute(name: string, value: string | Stateful<string> = "true") {
    if (typeof value === "function") {
      addStatefulAttribute(this.config, `data-${name}`, value)
    } else {
      addAttribute(this.config, `data-${name}`, value)
    }

    return this
  }

  aria(name: string, value: string | Stateful<string>) {
    if (typeof value === "function") {
      addStatefulAttribute(this.config, `aria-${name}`, value)
    } else {
      addAttribute(this.config, `aria-${name}`, value)
    }

    return this
  }

  on<E extends keyof HTMLElementEventMap | string>(event: E, handler: (evt: E extends keyof HTMLElementEventMap ? HTMLElementEventMap[E] : Event, context: any) => StoreMessage<any>): this {
    setEventHandler(this.config, event, handler as (evt: Event, context: any) => StoreMessage<any>)
    return this
  }

  resetConfig(config: VirtualNodeConfig) {
    this.config = config
  }
}

export class InputElementConfig extends BasicElementConfig {
  value(val: string | Stateful<string>) {
    if (typeof val === "function") {
      addStatefulProperty(this.config, "value", val)
    } else {
      addProperty(this.config, "value", val)
    }

    return this
  }

  checked(value: boolean | Stateful<boolean>) {
    this.recordBooleanProperty("checked", value)

    return this
  }
}

export class SVGElementConfig extends BasicElementConfig {
  recordAttribute(attributeAlias: string, value: string | Stateful<string>): this {
    const attribute = svgAttributeNames.get(attributeAlias) ?? attributeAlias
    return super.recordAttribute(attribute, value)
  }
}

const MagicConfig = new Proxy({}, {
  get: (_, prop, receiver) => {
    const attribute = prop as string
    if (booleanAttributes.has(attribute)) {
      return function (isSelected: boolean | Stateful<boolean>) {
        return receiver.recordBooleanAttribute(attribute, isSelected)
      }
    } else {
      return function (value: string | Stateful<string>) {
        return receiver.recordAttribute(attribute, value)
      }
    }
  }
})

Object.setPrototypeOf(Object.getPrototypeOf(new BasicElementConfig()), MagicConfig)
