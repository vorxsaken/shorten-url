import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import type { Session } from "next-auth"

import { Ubuntu } from "@next/font/google"

const ubuntu = Ubuntu({weight: '400', subsets: ['cyrillic']})


export default function App({ Component, pageProps : { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <div className={ubuntu.className}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
