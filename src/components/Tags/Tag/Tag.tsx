import { useContext } from "preact/hooks"
import type { FormatedTag } from "../../../interfaces/Tag"
import { NotificationsManager } from "../../../managers/notifications"
import { ProfileContext } from "../../../managers/profile"
import { TagsContext } from "../../../managers/tags"
import styles from "./Tag.module.css"

interface TagProps {
  tag: FormatedTag
}

export function Tag({ tag }: TagProps) {
  const tags = useContext(TagsContext)
  const className = [
    styles.tag,
    tag.name === tags.selectedTag.value ? styles.selected : "",
  ].join(" ")
  const profile = useContext(ProfileContext)

  function onClick() {
    if (!profile.isAuthenticated.value) {
      return
    }

    tags.selectAndFetch(tag.name)
    NotificationsManager.addNotification({
      type: "success",
      title: "Изменение тега",
      message: `Ваш новый тег: ${tag.name}`,
    })
  }

  return (
    <button className={className} onClick={onClick}>
      <p className={styles.place}>{tag.place + 1}</p>
      <p className={styles.name}>{tag.name}</p>
      <p className={styles.score}>{tag.pixels === -1 ? "??" : tag.pixels}</p>
    </button>
  )
}
