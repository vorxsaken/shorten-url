import styles from "./NavBar.module.css";
import { Charm } from "@next/font/google";
import { useEffect, useRef, useState } from "react";
const charm = Charm({ weight: '400', subsets: ['latin'] })

export default function NavBar() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    return (
        <>
            <header className={styles.header}>
                <p className={charm.className}>Shorten.io</p>
                <div>
                    <span>Sign Up</span>
                    <span>About</span>
                </div>
                <svg 
                    data-isOpen={isOpenMenu}
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
            </header>
        </>
    )
}