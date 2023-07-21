# Directives

## ClickOutside

- [on](/guide/typescript/utils#domUtils)
- [isServer](/guide/typescript/utils#is)

```ts
import { on } from '/typescript/utils/domUtils'
import { isServer } from '/typescript/utils/is'
import type {
  ComponentPublicInstance,
  DirectiveBinding,
  ObjectDirective,
} from 'vue'

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void

type FlushList = Map<
  HTMLElement,
  {
    documentHandler: DocumentHandler
    bindingFn: (...args: unknown[]) => unknown
  }
>

const nodeList: FlushList = new Map()

let startClick: MouseEvent

if (!isServer) {
  on(document, 'mousedown', (e: MouseEvent) => (startClick = e))
  on(document, 'mouseup', (e: MouseEvent) => {
    for (const { documentHandler } of nodeList.values())
      documentHandler(e, startClick)
  })
}

function createDocumentHandler(
  el: HTMLElement,
  binding: DirectiveBinding
): DocumentHandler {
  let excludes: HTMLElement[] = []
  if (Array.isArray(binding.arg)) {
    excludes = binding.arg
  } else {
    // due to current implementation on binding type is wrong the type casting is necessary here
    excludes.push(binding.arg as unknown as HTMLElement)
  }
  return function (mouseup, mousedown) {
    const popperRef = (
      binding.instance as ComponentPublicInstance<{
        popperRef: Nullable<HTMLElement>
      }>
    ).popperRef
    const mouseUpTarget = mouseup.target as Node
    const mouseDownTarget = mousedown.target as Node
    const isBound = !binding || !binding.instance
    const isTargetExists = !mouseUpTarget || !mouseDownTarget
    const isContainedByEl =
      el.contains(mouseUpTarget) || el.contains(mouseDownTarget)
    const isSelf = el === mouseUpTarget

    const isTargetExcluded =
      (excludes.length &&
        excludes.some(item => item?.contains(mouseUpTarget))) ||
      (excludes.length && excludes.includes(mouseDownTarget as HTMLElement))
    const isContainedByPopper =
      popperRef &&
      (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget))
    if (
      isBound ||
      isTargetExists ||
      isContainedByEl ||
      isSelf ||
      isTargetExcluded ||
      isContainedByPopper
    )
      return

    binding.value()
  }
}

const ClickOutside: ObjectDirective = {
  beforeMount(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    })
  },
  updated(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    })
  },
  unmounted(el) {
    nodeList.delete(el)
  },
}

export default ClickOutside
```

## repeatClick

- [on,once](/guide/typescript/utils#domUtils)

```ts
/**
 * Prevent repeated clicks
 * @Example v-repeat-click="()=>{}"
 */
import { on, once } from '/guide/typescript/utils#domUtils'
import type { Directive, DirectiveBinding } from 'vue'

const repeatDirective: Directive = {
  beforeMount(el: Element, binding: DirectiveBinding<any>) {
    let interval: Nullable<IntervalHandle> = null
    let startTime = 0
    const handler = (): void => binding?.value()
    const clear = (): void => {
      if (Date.now() - startTime < 100) handler()

      interval && clearInterval(interval)
      interval = null
    }

    on(el, 'mousedown', (e: MouseEvent): void => {
      if ((e as any).button !== 0) return
      startTime = Date.now()
      once(document as any, 'mouseup', clear)
      interval && clearInterval(interval)
      interval = setInterval(handler, 100)
    })
  },
}

export default repeatDirective
```
