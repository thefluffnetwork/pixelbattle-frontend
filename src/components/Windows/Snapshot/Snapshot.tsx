import { SnapshotManager } from "../../../managers/snapshot"
import { Button } from "../../General/Button/Button"
import { TextField } from "../../General/TextField/TextField"
import { WindowBox } from "../../WindowBox/WindowBox"
import styles from "./Snapshot.module.css"

export function Snapshot() {
  return (
    <WindowBox title="Снимок холста">
      <div className={styles.wrapper}>
        <Button onClick={() => void SnapshotManager.toggle()}>
          {SnapshotManager.enable.value ? "Остановить" : "Область"}
        </Button>
        <p class={styles.or}>или</p>
        <Button onClick={() => void SnapshotManager.fullScreenshot()}>
          Всего холста
        </Button>

        {SnapshotManager.empty.value ? (
          <></>
        ) : (
          <>
            <p class={styles.groupTitle + styles.label}>Действия</p>
            <Button onClick={() => void SnapshotManager.toFile()}>
              Сохранить
            </Button>
          </>
        )}

        <p class={styles.label}>Множитель масштаба </p>
        <TextField
          placeholder="Множитель масштаба"
          onInput={(v: string) => {
            !isNaN(v as any) ? (SnapshotManager.scale.value = Number(v)) : ""
          }}
          type="number"
          min={1}
          max={100}
          value={SnapshotManager.scale.value + ""}></TextField>
      </div>
    </WindowBox>
  )
}
