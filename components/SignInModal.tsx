import styles from "./SignInModal.module.css"
import { AiFillGoogleCircle } from "react-icons/ai"

export default function SignInModal({ showModal }: { showModal: boolean }) {

    return (
        <div
            data-showmodal={showModal}
            className={styles.container}
            id="modal"
        >
            <div id="modal" className={styles.signInButton}>
                <div id="modal">
                    <AiFillGoogleCircle id="modal" />
                </div>
                <div id="modal">
                    Google
                </div>
            </div>
        </div>
    )
}