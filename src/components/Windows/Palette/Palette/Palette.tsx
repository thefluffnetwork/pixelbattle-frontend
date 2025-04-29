import { useContext } from "preact/hooks"
import { PaletteContext } from "../../../../managers/palette"
import { ColorCreate } from "../ColorCreate/ColorCreate"
import { ColorDelete } from "../ColorDelete/ColorDelete"
import { ColorPick } from "../ColorPick/ColorPick"
import { ColorSelect } from "../ColorSelect/ColorSelect"
import { PaletteGroup } from "../PaletteGroup/PaletteGroup"
import styles from "./Palette.module.css"

export function Palette() {
  const palette = useContext(PaletteContext)

  palette.load()

  return (
    <div className={styles.palette}>
      <PaletteGroup>
        {palette.palette.value.colors.map(color => (
          <ColorSelect color={color} />
        ))}
      </PaletteGroup>
      <hr className={styles.hr} />
      <PaletteGroup>
        <ColorPick />
        <ColorCreate />
        <ColorDelete />
      </PaletteGroup>
    </div>
  )
}
