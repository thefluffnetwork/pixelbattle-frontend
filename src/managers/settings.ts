import { signal } from "@preact/signals"
import { createContext } from "preact"
import { AppLocalStorage } from "../classes/AppLocalStorage"
import { config } from "../config"

export const SettingsManager = {
  settings: signal(config.defaults.settings),
  load() {
    const settings = AppLocalStorage.get("settings")
    if (settings) this.settings.value = settings
  },
  save() {
    AppLocalStorage.set(
      "settings",
      this.settings.value ?? config.defaults.settings,
    )
  },
}

export const SettingsContext = createContext({} as typeof SettingsManager)
