import { useContext, useEffect, useState } from "preact/hooks"
import { config } from "../../../config"
import { ProfileContext } from "../../../managers/profile"
import { TagsContext } from "../../../managers/tags"
import { ClosedTagCreate } from "../../Tags/ClosedTagCreate/ClosedTagCreate"
import { isTagCreateOpened } from "../../Tags/OpenTagSignal"
import { OpenedTagCreate } from "../../Tags/OpenedTagCreate/OpenedTagCreate"
import { Tag } from "../../Tags/Tag/Tag"
import { WindowBox } from "../../WindowBox/WindowBox"
import styles from "./Tags.module.css"

export function Tags() {
  const [_tagsInterval, setTagsInterval] = useState<NodeJS.Timeout>()
  const tags = useContext(TagsContext)
  const profile = useContext(ProfileContext)

  useEffect(() => {
    tags.fetch()
    const id = setInterval(tags.fetch, config.time.update.tags)

    setTagsInterval(id)
  }, [])

  return (
    <WindowBox title="Теги">
      <div className={styles.tags}>
        {tags.tags.value.length === 0 ? (
          <p className={styles.empty}>Нет тегов</p>
        ) : (
          tags.tags.value.map((tag, index) => <Tag key={tag.name} tag={tag} />)
        )}
        {profile.isAuthenticated.value ? (
          isTagCreateOpened.value ? (
            <OpenedTagCreate />
          ) : (
            <ClosedTagCreate />
          )
        ) : null}
      </div>
    </WindowBox>
  )
}
