import { useComputed, useSignal } from "@preact/signals";
import { Button } from "../../../General/Button/Button";
import { Checkbox } from "../../../General/Checkbox/Checkbox";
import styles from "./ProfileLoginBody.module.css"
import { config } from "../../../../config";

export function ProfileLoginBody() {
    const agreement = useSignal({
        rules: false
    })

    const isAllowed = useComputed(() => !Object.values(agreement.value).includes(false))


    return <div class={styles.wrapper}>
        <div class={styles.checkboxes}>
            <Checkbox
                name="rules"
                onChange={(val) => { agreement.value = { ...agreement.value, rules: val } }}>
                Я согласен с правилами PixelBattle (которые мы пока не придумали)
            </Checkbox>
        </div>

        <Button href="/login" disabled={!isAllowed.value}>Войти</Button>
    </div>
}
