import { useContext } from "preact/hooks"
import { CooldownContext } from "../../managers/cooldown"
import styles from "./Cooldown.module.css"

export function Cooldown() {
  const cooldown = useContext(CooldownContext)

  if (!cooldown.hasCooldown.value) return null

  return (
    <div className={styles.wrapper}>
      <progress
        className={styles.progress}
        value={cooldown.progress}
        max="100"></progress>
      <p className={styles.label}>{cooldown.progress.value.toFixed(0)}%</p>
    </div>
  )
}
