import { useContext } from "preact/hooks"
import { NotificationsManager } from "../../../managers/notifications"
import { ProfileManager } from "../../../managers/profile"
import { TagsContext } from "../../../managers/tags"
import { Button } from "../../General/Button/Button"
import { isTagCreateOpened } from "../OpenTagSignal"
import styles from "./ClosedTagCreate.module.css"

export function ClosedTagCreate() {
  const tags = useContext(TagsContext)

  function openTagCreate() {
    isTagCreateOpened.value = true
  }

  function deleteTag() {
    if (!ProfileManager.user.value?.tag) {
      return
      // maybe make a message about the impossibility of changing the tag due to its absence?
      // or make the button disabled when the tag is not set
    }

    tags.remove()
    NotificationsManager.addNotification({
      type: "success",
      title: "Изменение тега",
      message: "Тег был сброшен",
    })
  }

  return (
    <div className={styles.form}>
      <Button onClick={openTagCreate}>Новый тег</Button>
      <Button onClick={deleteTag} type="danger">
        Убрать текущий
      </Button>
    </div>
  )
}
