import styles from "./NavBar.module.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { charm } from "@/utils";
import SignInModal from "./SignInModal";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const [dropdownMobile, setDropdownMobile] = useState(false)
    const ref = useRef(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            const current = ref.current as any;
            if (modal && ref.current && !current.contains(e.target)) {
                setModal(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside, false);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [modal])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/" className={`${styles.logo} ${charm.className}`}>Shorten</Link>
                <div>
                    {status === "authenticated" ? (
                        <div className={styles.dropdownContainer}>
                            <div className={styles.link}>
                                <p>{session?.user?.name}</p>
                            </div>
                            <div className={styles.dropdown}>
                                <Link className={styles.dropdownMenu} href='/userLinks'>
                                    My Links
                                </Link>
                                <span
                                    className={styles.dropdownMenu}
                                    onClick={() => signOut()}>
                                        Logout
                                </span>
                            </div>
                        </div>
                    ) :
                        modal ? (
                            <div
                                className={styles.link}>
                                Sign Up
                            </div>
                        ) : (
                            <span
                                onClick={() => setModal(true)}
                                className={styles.link}>
                                Sign Up
                            </span>
                        )
                    }
                    <Link
                        className={styles.link}
                        href="/about">
                        About
                    </Link>
                </div>
                <svg
                    data-isopen={isOpenMenu}
                    onClick={() => setIsOpenMenu(!isOpenMenu)}
                    width="35"
                    height="30"
                    viewBox="0 0 20 20">
                    <path
                        strokeLinecap="round"
                        strokeWidth={2}
                        d={
                            isOpenMenu ?
                                'M 3 16.5 L 17 2.5' :
                                "M 2 2.5 L 20 2.5"
                        }
                    />
                    <path
                        strokeLinecap="round"
                        strokeWidth={2}
                        d="M 2 9.423 L 20 9.423"
                    />
                    <path
                        strokeLinecap="round"
                        strokeWidth={2}
                        d={
                            isOpenMenu ?
                                "M 3 2.5 L 17 16.346" :
                                "M 2 16.346 L 20 16.346"
                        }
                    />
                </svg>
            </div>
            <div data-isopen={isOpenMenu} className={styles.mobileMenu}>
                {
                    status === "authenticated" ? (
                        <div className={styles.dropdownMobileContainer}>
                            <span
                                onClick={() => setDropdownMobile(!dropdownMobile)}
                            >
                                {session?.user?.name}
                            </span>
                            <div
                                data-dropdownmobile={dropdownMobile}
                                className={styles.dropdownMobile}
                            >
                                <span>My Links</span>
                                <span onClick={() => signOut()}>Logout</span>
                            </div>
                        </div>
                    ) : (
                        <span onClick={() => setModal(true)}>
                            Sign In
                        </span>
                    )
                }
                <span>About</span>
            </div>
            <div ref={ref}>
                <SignInModal showModal={modal} />
            </div>
        </div>
    )
}