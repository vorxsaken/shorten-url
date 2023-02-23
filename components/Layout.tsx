import NavBar from "./NavBar"
import Footer from "./Footer"
import { ReactNode, useEffect } from "react"
import { UseThemeContext } from "@/context/StateProvider"

export default function Layout({ children }: { children: ReactNode }) {
    const [{ dark }] = UseThemeContext();
    if (dark) document.documentElement.classList.add('dark');

    return (
        <>
            <NavBar />
            <div>{children}</div>
            <Footer />
        </>
    )
}