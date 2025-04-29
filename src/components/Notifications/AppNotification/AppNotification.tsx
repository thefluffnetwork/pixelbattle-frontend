import { useEffect, useState } from "preact/hooks"
import { config } from "../../../config"
import {
  type NotificationInfo,
  NotificationsManager,
} from "../../../managers/notifications"
import styles from "./AppNotification.module.css"

export function AppNotification({
  notification,
}: { notification: NotificationInfo }) {
  const [className, setClassName] = useState("")
  const [_time, setTime] = useState<NodeJS.Timeout>(setTimeout(() => {}, 0))

  useEffect(() => {
    setTime(
      setTimeout(() => {
        const animationTime = 200

        setClassName(styles.animate)
        setTimeout(
          () => NotificationsManager.removeNotification(notification.id),
          animationTime,
        )
      }, config.time.notificationRemoved),
    )
  }, [])

  return (
    <div
      className={[
        styles.notification,
        styles[notification.type],
        className,
      ].join(" ")}>
      <p className={styles.title}>{notification.title}</p>
      <p className={styles.message}>{notification.message}</p>
    </div>
  )
}
