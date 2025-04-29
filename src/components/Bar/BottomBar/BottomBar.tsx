import { Cooldown } from "../../Cooldown/Cooldown"
import { Coordinates } from "../../Coordinates/Coordinates"
import { PixelInfo } from "../../PixelInfo/PixelInfo"
import { Palette } from "../../Windows/Palette/Palette/Palette"
import styles from "./BottomBar.module.css"

export function BottomBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.coordinates}>
        <Coordinates />
        <PixelInfo />
      </div>

      <div className={styles.cooldown}>
        <Cooldown />
      </div>

      <div className={styles.palette}>
        <Palette />
      </div>
    </div>
  )
}
