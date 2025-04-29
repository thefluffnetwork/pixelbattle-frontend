import type { ComponentChildren } from "preact"
import styles from "./PaletteGroup.module.css"

interface PaletteGroupProps {
  children: ComponentChildren
}

export function PaletteGroup({ children }: PaletteGroupProps) {
  return <div className={styles.group}>{children}</div>
}
