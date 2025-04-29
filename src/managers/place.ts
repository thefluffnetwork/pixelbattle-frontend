import { type Signal, signal } from "@preact/signals"
import { createContext } from "preact"
import { AppFetch } from "../classes/AppFetch"
import { AppImage, ImageFormat } from "../classes/AppImage"
import type { PlaceContainer } from "../components/Place/PlaceContainer"

export const PlaceManager = {
  image: signal(null) as Signal<null | AppImage>,
  container: signal({} as PlaceContainer),
  async fetch() {
    const image = await AppFetch.pixels()

    PlaceManager.image.value = await new AppImage(
      image,
      ImageFormat.RGB,
    ).process()
  },
}

export const PlaceContext = createContext({} as typeof PlaceManager)
