import NavBar from "./NavBar"
import Footer from "./Footer"
import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <NavBar />
            <div>{children}</div>
            <Footer />
        </>
    )
}