import { NotificationList } from "../../Notifications/NotificationList/NotificationList"
import { Overlay } from "../../Windows/Overlay/Overlay"
import { Profile } from "../../Windows/Profile/Profile"
import { Snapshot } from "../../Windows/Snapshot/Snapshot"
import { Tags } from "../../Windows/Tags/Tags"
import styles from "./Sidebar.module.css"

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Profile />
      <Tags />
      <Overlay />
      <Snapshot />
      <NotificationList />
    </div>
  )
}
