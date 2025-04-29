import { useContext } from "preact/hooks"
import { NotificationsContext } from "../../../managers/notifications"
import { AppNotification } from "../AppNotification/AppNotification"
import styles from "./NotificationList.module.css"

export function NotificationList() {
  const notifications = useContext(NotificationsContext)

  return (
    <div className={styles.notifications}>
      {notifications.notifications.value.map((notification, index) => (
        <AppNotification key={notification.id} notification={notification} />
      ))}
    </div>
  )
}
