import { computed, signal } from "@preact/signals"
import { createContext } from "preact"
import { AppColor } from "../classes/AppColor"
import { AppLocalStorage } from "../classes/AppLocalStorage"
import { config } from "../config"

export const PaletteManager = {
  palette: signal(config.defaults.colors.palette),
  reset() {
    PaletteManager.palette.value = config.defaults.colors.palette

    PaletteManager.save()
  },
  setCurrentColor: (color: AppColor) => {
    PaletteManager.palette.value = {
      ...PaletteManager.palette.value,
      selected: color,
    }

    PaletteManager.save()
  },
  isDefaultColors: () => {
    return (
      PaletteManager.palette.value.colors.length ===
      config.defaults.colors.palette.colors.length
    )
  },
  removeColor(color: AppColor) {
    PaletteManager.palette.value = {
      selected:
        PaletteManager.palette.value.colors.at(-2) ??
        PaletteManager.palette.value.selected,
      colors: PaletteManager.palette.value.colors.filter(c => !c.equals(color)),
    }

    PaletteManager.save()
  },
  isDefaultColor(color: AppColor) {
    return config.defaults.colors.palette.colors.some(c => c.equals(color))
  },
  addColor(color: AppColor) {
    PaletteManager.palette.value = {
      ...PaletteManager.palette.value,
      colors: [...PaletteManager.palette.value.colors, color],
    }

    PaletteManager.save()
  },
  addAndSelect(color: AppColor) {
    const isColorInPalette = PaletteManager.palette.value.colors.some(c =>
      c.equals(color),
    )

    if (!isColorInPalette) {
      this.addColor(color)
    }

    this.setCurrentColor(color)

    PaletteManager.save()
  },
  save() {
    AppLocalStorage.set(
      "palette",
      {
        colors: PaletteManager.palette.value.colors,
        selected: PaletteManager.palette.value.selected,
      },
      ({ colors, selected }) =>
        JSON.stringify({
          colors: colors.map(color => color.toHex()),
          selected: selected.toHex(),
        }),
    )
  },
  load() {
    const palette = AppLocalStorage.get("palette", flatPalette => {
      return {
        colors: flatPalette.colors.map(color => new AppColor(color)),
        selected: new AppColor(flatPalette.selected),
      }
    })

    if (!palette) return

    PaletteManager.palette.value = palette
  },
}

export const PaletteContext = createContext({} as typeof PaletteManager)

export interface FlatPalette {
  colors: string[]
  selected: string
}
