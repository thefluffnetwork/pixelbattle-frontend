import { Point } from "@pixi/math"
import { config } from "../config"
import type { MessageData } from "../interfaces/Actions"
import { InfoManager } from "../managers/info"
import { PlaceManager } from "../managers/place"
import { AppColor } from "./AppColor"

export class AppWebSocket {
  private ws!: WebSocket

  constructor() {}

  public connect() {
    this.createWebSocket()
    this.setupEventListeners()
  }

  private createWebSocket() {
    if (this.ws) {
      this.ws.close()
    }
    this.ws = new WebSocket(
      config.url.api.replace("http", "ws") + "/pixels/socket",
    )
  }

  private setupEventListeners() {
    this.ws.addEventListener("open", this.onOpen.bind(this))
    this.ws.addEventListener("message", this.onMessage.bind(this))
    this.ws.addEventListener("close", this.onClose.bind(this))
    this.ws.addEventListener("error", this.onError.bind(this))
  }

  private async onMessage(event: MessageEvent<string | Blob>) {
    const data: MessageData =
      event.data instanceof Blob
        ? await new Response(event.data).json()
        : JSON.parse(event.data)

    if (PlaceManager.image.value === null) {
      return
    }

    switch (data.op) {
      case "PLACE":
        PlaceManager.image.value.setPixel(
          new Point(data.x, data.y),
          new AppColor(data.color),
        )
        PlaceManager.container.value.update()
        break

      case "ENDED":
        if (data.value) InfoManager.end()
        else InfoManager.start()
        break

      case "RESET":
        location.reload()
        break
    }
  }
  private onOpen(event: Event) {}

  private reconnect() {
    this.connect()
  }

  private onClose(event: CloseEvent) {
    this.reconnect()
  }

  private onError(event: Event) {
    this.onClose(new CloseEvent("close", event))
  }
}
