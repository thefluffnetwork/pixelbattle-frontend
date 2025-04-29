import { type Signal, signal } from "@preact/signals"
import { createContext } from "preact"
import { AppFetch } from "../classes/AppFetch"
import type { ApiInfo } from "../interfaces/Info"

export const InfoManager = {
  info: signal(null) as Signal<null | ApiInfo>,
  end() {
    if (InfoManager.info.value === null) {
      return
    }

    InfoManager.info.value = {
      ...InfoManager.info.value,
      ended: true,
    }
  },
  start() {
    if (InfoManager.info.value === null) {
      return
    }

    InfoManager.info.value = {
      ...InfoManager.info.value,
      ended: false,
    }
  },
  async fetch() {
    const info = await AppFetch.info()

    InfoManager.info.value = {
      ...info,
      cooldown: info.cooldown,
    }

    return info
  },
}

export const InfoContext = createContext({} as typeof InfoManager)
