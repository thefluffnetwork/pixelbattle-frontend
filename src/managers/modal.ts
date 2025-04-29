import { type Signal, computed, signal } from "@preact/signals"
import { type ComponentChildren, createContext } from "preact"

export const ModalManager = {
  modal: signal(null) as Signal<null | {
    title: string
    children: ComponentChildren
  }>,
  isOpen: computed(() => false),
  open(title: string, children: ComponentChildren) {
    ModalManager.modal.value = { title: title, children: children }
  },
  close() {
    ModalManager.modal.value = null
  },
}

ModalManager.isOpen = computed(() => ModalManager.modal.value !== null)

export const ModalContext = createContext({} as typeof ModalManager)
