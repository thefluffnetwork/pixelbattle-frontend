import { useContext, useEffect } from "preact/hooks"
import { OverlayContext } from "../../../managers/overlay"
import { ImageSelect } from "../../Overlay/ImageSelect/ImageSelect"
import { OverlayTransform } from "../../Overlay/OverlayTransform/OverlayTransform"
import { WindowBox } from "../../WindowBox/WindowBox"

export function Overlay() {
  const overlay = useContext(OverlayContext)

  useEffect(() => {
    overlay.load()
  }, [])

  return (
    <WindowBox title="Изображение">
      {overlay.isSet.value ? <OverlayTransform /> : <ImageSelect />}
    </WindowBox>
  )
}
