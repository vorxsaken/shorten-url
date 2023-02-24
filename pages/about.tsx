import Layout from "@/components/Layout"
import { charm } from "@/utils";
import Link from "next/link";

export default function about() {
  return (
    <Layout>
        <div className="main">
            <div className="header">
                <div className={`title ${charm.className}`}>
                    About
                </div>
            </div>
            <article className="body">
                <div className="about">
                    what is this web app ?. this web app is thing you can use to shorten long ass url 
                    for example you may had url like this : <br /><br />
                     <i>https://www.bilibili.tv/en/play/1066507?bstar_from=bstar-web.homepage.anime.all</i> <br /><br />
                    i mean who&apos;s gonna remember that, with this app what u can do visit the initial page of this &nbsp;
                    <Link style={{fontWeight: 'bolder'}} href="/">app</Link> then enter your long url, click generate button, then voila, you got the shorten url 
                    and the qrcode that you can download. you can also sign up with your google account if you think you have 
                    a bunch of url the number of people clicks your url you wanna track.
                </div>
            </article>
        </div>
    </Layout>
  )
}
