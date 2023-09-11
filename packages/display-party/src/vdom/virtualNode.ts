import { GetState, Stateful, StoreMessage } from "state-party";

export enum NodeType {
  TEXT = 3,
  ELEMENT = 1,
  STATEFUL = 15,
  REACTIVE_TEXT = 16
}

export interface TextNode {
  type: NodeType.TEXT
  value: string
  node: Node | undefined
}

export interface ReactiveTextNode {
  type: NodeType.REACTIVE_TEXT
  generator: Stateful<string>
  node: Node | undefined
  unsubscribe?: () => void
}

export interface ElementNode {
  type: NodeType.ELEMENT
  is?: string
  tag: string
  data: VirtualNodeConfig
  children: Array<VirtualNode>
  node: Element | undefined
  key?: string
}

export interface StatefulNode {
  type: NodeType.STATEFUL
  key?: string
  generator: (get: GetState) => VirtualNode
  node: Node | undefined
  unsubscribe?: () => void
}

export type VirtualNode = TextNode | ReactiveTextNode | ElementNode | StatefulNode

declare type Listener = (ev: Event) => any;

export interface StatefulAttribute {
  generator: Stateful<string>
  unsubscribe?: () => void
}

export interface VirtualNodeConfig {
  props?: Record<string, any>
  attrs: Record<string, string>
  stateful?: Record<string, StatefulAttribute>
  on?: { [N in keyof HTMLElementEventMap]?: Listener }
  key?: string
}

export interface StoreContext {
  generator: (get: GetState) => VirtualNode
}

export function virtualNodeConfig(): VirtualNodeConfig {
  return {
    attrs: {}
  }
}

export function addProperty(config: VirtualNodeConfig, name: string, value: string) {
  if (!config.props) { config.props = {} }
  config.props[name] = value
}

export function addAttribute(config: VirtualNodeConfig, name: string, value: string) {
  config.attrs[name] = value
}

export function setKey(config: VirtualNodeConfig, key: string) {
  config.key = key
}

export function addClasses(config: VirtualNodeConfig, classNames: Array<string>) {
  addAttribute(config, "class", classNames.join(" "))
}

export function addStatefulAttribute(config: VirtualNodeConfig, name: string, generator: Stateful<string>) {
  if (!config.stateful) { config.stateful = {} }
  config.stateful[name] = {
    generator
  }
}

export function addStatefulClasses(config: VirtualNodeConfig, generator: Stateful<Array<string>>) {
  addStatefulAttribute(config, "class", (get) => generator(get).join(" "))
}

export function setEventHandler<N extends keyof HTMLElementEventMap>(config: VirtualNodeConfig, event: N, handler: (evt: HTMLElementEventMap[N]) => StoreMessage<any, any>) {
  if (!config.on) { config.on = {} }

  config.on[event] = (evt: any) => {
    evt.target?.dispatchEvent(new CustomEvent("displayMessage", {
      bubbles: true,
      cancelable: true,
      detail: handler(evt)
    }))
  }
}

export function makeStatefulElement(config: VirtualNodeConfig, generator: (get: GetState) => VirtualNode, node?: Node): VirtualNode {
  const element: StatefulNode = {
    type: NodeType.STATEFUL,
    generator,
    node
  }

  if (config.key) {
    element.key = config.key
  }

  return element
}

export function makeVirtualElement(tag: string, config: VirtualNodeConfig, children: Array<VirtualNode>, node?: Element): ElementNode {
  const element: ElementNode = {
    type: NodeType.ELEMENT,
    tag: tag,
    data: config,
    children,
    node
  }

  if (config.key) {
    element.key = config.key
  }

  if (config.attrs.is) {
    element.is = config.attrs.is
  }

  return element
}

export function makeVirtualTextNode(text: string, node?: Node): TextNode {
  return {
    type: NodeType.TEXT,
    value: text,
    node
  }
}

export function makeReactiveTextNode(generator: (get: GetState) => string, node?: Node): ReactiveTextNode {
  return {
    type: NodeType.REACTIVE_TEXT,
    generator,
    node
  }
}