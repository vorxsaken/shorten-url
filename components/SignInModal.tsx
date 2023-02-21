import styles from "./SignInModal.module.css"
import { AiFillGoogleCircle } from "react-icons/ai"
import { signIn } from "next-auth/react"

export default function SignInModal({ showModal }: { showModal: boolean }) {

    return (
        <div data-showmodal={showModal} className={styles.container}>
            <div onClick={() => signIn("google") } className={styles.signInButton}>
                <div>
                    <AiFillGoogleCircle />
                </div>
                <div>
                    Google
                </div>
            </div>
        </div>
    )
}