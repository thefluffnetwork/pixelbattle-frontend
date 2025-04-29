import { useContext, useState } from "preact/hooks"
import { NotificationsManager } from "../../../managers/notifications"
import { TagsContext } from "../../../managers/tags"
import { Button } from "../../General/Button/Button"
import { Icon } from "../../General/Icon/Icon"
import { TextField } from "../../General/TextField/TextField"
import { isTagCreateOpened } from "../OpenTagSignal"
import styles from "./OpenedTagCreate.module.css"

export function OpenedTagCreate() {
  const tags = useContext(TagsContext)
  const [input, setInput] = useState<string>("")

  function createTag() {
    if (input === "") {
      return
    }

    tags.selectAndFetch(input)
    NotificationsManager.addNotification({
      type: "success",
      title: "Изменение тега",
      message: `Ваш новый тег: ${input}`,
    })

    isTagCreateOpened.value = false
  }

  function closeTagCreate() {
    isTagCreateOpened.value = false
  }

  return (
    <div className={styles.form}>
      <TextField placeholder="Новый тег" onInput={setInput} min={4} max={8} />
      <Button onClick={createTag}>
        <Icon icon="plus" />
      </Button>
      <Button onClick={closeTagCreate} type="danger">
        <Icon icon="plus" className={styles.closeIcon} />
      </Button>
    </div>
  )
}
