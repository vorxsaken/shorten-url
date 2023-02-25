import styles from "./NavBar.module.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { charm } from "@/utils";
import SignInModal from "./SignInModal";
import { useSession, signOut } from "next-auth/react";
import { UseThemeContext } from "@/context/StateProvider";
import lightMode from "../assets/light.png";
import darkMode from "../assets/dark.png";
import Image from "next/image";
import { useRouter } from "next/router";

export default function NavBar() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const [dropdownMobile, setDropdownMobile] = useState(false)
    const ref = useRef(null);
    const { data: session, status } = useSession();
    const [{ dark }, dispatch] = UseThemeContext();
    const router = useRouter();

    const changeMode = () => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.remove('dark');
            localStorage.removeItem('theme');
            dispatch({
                type: 'CHANGE_THEME',
                dark: false
            })
            return
        }

        dispatch({
            type: 'CHANGE_THEME',
            dark: true
        })
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }

    useEffect(() => {
        if (localStorage.getItem('theme')) {
            dispatch({
                type: 'CHANGE_THEME',
                dark: true
            })
        }
    }, [])

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
                    <div onClick={() => changeMode()} className={styles.changeMode}>
                        <Image src={dark ? lightMode : darkMode} width={25} height={25} alt="mode" />
                    </div>
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
                                <span onClick={() => router.push('/userLinks')} >My Links</span>
                                <span onClick={() => signOut()}>Logout</span>
                            </div>
                        </div>
                    ) : (
                        <span onClick={() => setModal(true)}>
                            Sign In
                        </span>
                    )
                }
                <Link href="/about">About</Link>
                <div onClick={() => changeMode()} className={styles.changeMode}>
                    <Image src={dark ? lightMode : darkMode} width={25} height={25} alt="mode" />
                </div>
            </div>
            <div ref={ref}>
                <SignInModal showModal={modal} />
            </div>
        </div>
    )
}