import type { TargetedEvent } from "preact/compat"
import { useContext } from "preact/hooks"
import { SettingsContext } from "../../../managers/settings"
import { Icon } from "../../General/Icon/Icon"
import styles from "./Snowflake.module.css"

export function Snowflake() {
  if (![11, 0, 1].includes(new Date().getMonth()))
    // December, January, February
    return null

  const settings = useContext(SettingsContext)

  function toggleSnow(event: TargetedEvent<HTMLInputElement>): void {
    settings.settings.value = {
      ...settings.settings.value,
      enableSnow: (event.target as HTMLInputElement).checked,
    }

    settings.save()
  }

  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        className={styles.input}
        onChange={toggleSnow}
        defaultChecked={settings.settings.value.enableSnow}
      />
      <Icon
        icon="snowflake"
        alt={"Переключить снег"}
        size={35}
        viewBoxSize={272}
      />
    </div>
  )
}
