import { attributesModule, classModule, eventListenersModule, h, init, propsModule, VNode, VNodeChildElement } from "snabbdom";
import { LoopMessage, State } from "../loop";

export type View = VNode
export type ViewChild = VNodeChildElement

class Property {
  type: "property" = "property"

  constructor(public key: string, public value: string) { }
}

class Attribute {
  type: "attribute" = "attribute"

  constructor(public key: string, public value: string) { }
}

export type ViewAttribute = Property | Attribute | EventHandler | CssClasses //| NullViewAttribute

export function id(value: string): ViewAttribute {
  return new Property("id", value)
}

export function data(name: string, value: string = ""): ViewAttribute {
  return new Attribute(`data-${name}`, value)
}

function basicElement(tag: string, attributes: Array<ViewAttribute>, children: Array<ViewChild>) {
  return h(tag, makeAttributes(attributes), children)
}

export function div(attributes: Array<ViewAttribute>, children: Array<ViewChild>): View {
  return basicElement("div", attributes, children)
}

export function h1(attributes: Array<ViewAttribute>, children: Array<ViewChild>): View {
  return basicElement("h1", attributes, children)
}

export function p(attributes: Array<ViewAttribute>, children: Array<ViewChild>): View {
  return basicElement("p", attributes, children)
}

export function ul(attributes: Array<ViewAttribute>, children: Array<ViewChild>): View {
  return basicElement("ul", attributes, children)
}

export function li(attributes: Array<ViewAttribute>, children: Array<ViewChild>): View {
  return basicElement("li", attributes, children)
}

export function button(attributes: Array<ViewAttribute>, children: Array<ViewChild>): View {
  return basicElement("button", attributes, children)
}

export function text(value: string): ViewChild {
  return value
}

export type CssClassname = string

class CssClasses {
  type: "css-classes" = "css-classes"

  constructor(public classObject: { [key: CssClassname]: boolean }) { }
}

export function cssClasses(classes: Array<CssClassname>): ViewAttribute {
  const classObject: { [key: CssClassname]: boolean } = {}
  for (const classname of classes) {
    classObject[classname] = true
  }

  return new CssClasses(classObject)
}

class EventHandler {
  type: "event" = "event"

  constructor(public event: string, public generator: (evt: Event) => any) { }
}

export function onClick<M extends LoopMessage<any>>(message: M): ViewAttribute {
  return new EventHandler("click", () => message)
}

export type ViewGenerator = (parent: View) => View

export function viewGenerator(viewState: State<View>): View {
  return h("view-fragment", {
    loop: {},
    hook: {
      insert: (vnode) => {
        const patch = init([
          propsModule,
          attributesModule,
          classModule,
          eventListenersModule
        ])

        const holder = document.createElement("view-holder")
        vnode.elm!.appendChild(holder)

        let oldNode: VNode | HTMLElement = holder

        vnode.data!.loop.unsubscribe = viewState.subscribe((updatedView) => {
          oldNode = patch(oldNode, updatedView)
        })
      },
      postpatch: (oldVNode, vNode) => {
        vNode.data!.loop = oldVNode.data!.loop
      },
      destroy: (vnode) => {
        vnode.elm!.childNodes.forEach(node => node.remove())
        vnode.data!.loop.unsubscribe()
      }
    }
  })
}

function makeAttributes(attributes: Array<ViewAttribute>): any {
  const dict: any = {
    props: {},
    attrs: {},
    class: {},
    on: {}
  }
  for (const attr of attributes) {
    switch (attr.type) {
      case "property":
        dict.props[attr.key] = attr.value
        break
      case "attribute":
        dict.attrs[attr.key] = attr.value
        break
      case "css-classes":
        dict.class = Object.assign(dict.class, attr.classObject)
        break
      case "event":
        dict.on[attr.event] = function (evt: Event) {
          evt.target?.dispatchEvent(new CustomEvent("displayMessage", {
            bubbles: true,
            cancelable: true,
            detail: attr.generator(evt)
          }))
        }
        break
      default:
        exhaustiveMatchGuard(attr)
    }
  }
  return dict
}

function exhaustiveMatchGuard(_: never) {
  throw new Error("Should never get here!")
}