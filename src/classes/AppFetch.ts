import type { Point } from "@pixi/math"
import { config } from "../config"
import type { ApiErrorResponse, ApiResponse } from "../interfaces/ApiResponse"
import type { ApiInfo } from "../interfaces/Info"
import type { ApiPixel, PixelInfo } from "../interfaces/Pixels"
import type { ProfileInfo } from "../interfaces/Profile"
import type { ApiTags } from "../interfaces/Tag"
import { ServerNotificationMap } from "../lib/notificationMap"
import { NotificationsManager } from "../managers/notifications"
import { ProfileManager } from "../managers/profile"

export class AppFetch {
  private static fetch<T extends {}>(options: {
    url: string
    method: "POST" | "PUT" | "GET"
    withCredentials: boolean
    body?: unknown
  }) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (options.withCredentials) {
      headers["Authorization"] = `Bearer ${ProfileManager.profile.value?.token}`
    }

    return fetch(config.url.api + options.url, {
      method: options.method,
      headers: options.method === "GET" ? undefined : headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    })
      .then(res => res.json() as Promise<T | ApiErrorResponse>)
      .then(AppFetch.checkForErrors<T>)
  }

  static async post<T extends {}>(
    url: string,
    body: unknown,
    withCredentials = false,
  ) {
    return AppFetch.fetch<T>({ url, method: "POST", withCredentials, body })
  }

  static async put<T extends {}>(
    url: string,
    body: unknown,
    withCredentials = false,
  ) {
    return AppFetch.fetch<T>({ url, method: "PUT", withCredentials, body })
  }

  static async get<T extends {}>(url: string, withCredentials = false) {
    return AppFetch.fetch<T>({ url, method: "GET", withCredentials })
  }

  static processError(error: ApiErrorResponse) {
    const notification = ServerNotificationMap[error.reason] ?? {
      title: "Неизвестная ошибка (С)",
      message: error.reason,
    }

    NotificationsManager.addNotification({
      ...notification,
      type: "error",
    })
  }

  static checkForErrors<T extends {} | ApiErrorResponse>(
    res: T | ApiErrorResponse,
  ) {
    if ("error" in res && res.error) {
      AppFetch.processError(res)

      return Promise.reject(res)
    }

    return res as T
  }

  static async pixels() {
    return fetch(config.url.api + "/pixels.png").then(res => res.blob())
  }

  static async info(): Promise<ApiInfo> {
    return AppFetch.get<ApiInfo>("/game")
  }

  static async profile(): Promise<ProfileInfo> {
    return AppFetch.get<ProfileInfo>(
      `/users/${ProfileManager.profile.value?.id}`,
    )
  }

  static async getPixel(point: Point): Promise<PixelInfo> {
    return AppFetch.get<PixelInfo>(`/pixels?x=${point.x}&y=${point.y}`)
  }

  static async tags(): Promise<ApiTags> {
    return AppFetch.get<ApiTags>("/pixels/tag")
  }

  static async putPixel(pixel: ApiPixel) {
    return AppFetch.put<ApiResponse>("/pixels", pixel, true)
  }

  static async changeTag(tag: string): Promise<ApiResponse> {
    return AppFetch.post<ApiResponse>(
      `/users/${ProfileManager.profile.value?.id}/tag`,
      { tag },
      true,
    )
  }
}
