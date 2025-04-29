import { useContext } from "preact/hooks"
import { ColorPickerContext } from "../../../../managers/picker"
import { Icon } from "../../../General/Icon/Icon"
import styles from "./ColorPick.module.css"

export function ColorPick() {
  const picker = useContext(ColorPickerContext)

  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        name="color-pick"
        className={styles.input}
        onInput={() => picker.toggle()}
        checked={picker.isEnabled.value}
      />
      <Icon
        icon="color-picker"
        className={styles.icon}
        alt={"Пипетка"}
        viewBoxSize={21}
      />
    </div>
  )
}
