import { useComputed, useSignal } from "@preact/signals"
import { Button } from "../../../General/Button/Button"
import { Checkbox } from "../../../General/Checkbox/Checkbox"
import styles from "./ProfileLoginBody.module.css"

export function ProfileLoginBody() {
  const agreement = useSignal({
    noNaziSymbols: false,
    noPolitics: false,
    noPorn: false,
    noOffensiveContent: false,
  })

  const isAllowed = useComputed(
    () => !Object.values(agreement.value).includes(false),
  )

  return (
    <div class={styles.wrapper}>
      <div class={styles.checkboxes}>
        <Checkbox
          name="rules"
          onChange={noNaziSymbols => {
            agreement.value = { ...agreement.value, noNaziSymbols }
          }}>
          Я согласен не рисовать нацистскую символику
        </Checkbox>
        <Checkbox
          name="rules"
          onChange={noPolitics => {
            agreement.value = { ...agreement.value, noPolitics }
          }}>
          Я согласен не рисовать ничего политического, включая символику России
          и Украины, а так же их территорий
        </Checkbox>
        <Checkbox
          name="rules"
          onChange={noPorn => {
            agreement.value = { ...agreement.value, noPorn }
          }}>
          Я согласен не рисовать порно (эротические элементы разрешены)
        </Checkbox>
        <Checkbox
          name="rules"
          onChange={noOffensiveContent => {
            agreement.value = { ...agreement.value, noOffensiveContent }
          }}>
          Я согласен не рисовать оскорбительные изображения
        </Checkbox>
      </div>

      <Button href="/login" disabled={!isAllowed.value}>
        Войти
      </Button>
    </div>
  )
}
