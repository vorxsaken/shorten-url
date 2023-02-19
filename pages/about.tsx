import Layout from "@/components/Layout"
import { charm } from "@/utils";

export default function about() {
  return (
    <Layout>
        <div className="main">
            <div className="header">
                <div className={`title ${charm.className}`}>
                    About
                </div>
            </div>
            <div className="body">
                <div className="about">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod praesentium nesciunt nobis molestias itaque error reiciendis nostrum, labore eaque saepe pariatur laborum architecto voluptatibus. Rem repudiandae neque exercitationem esse quia.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nostrum aliquam repellat quia est sed, quae et maxime deleniti provident tenetur, aspernatur excepturi architecto similique commodi facere facilis ipsam eveniet?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam iusto perspiciatis nihil fugiat architecto repellat quas unde? Quae ducimus, eveniet, cupiditate numquam fugit, beatae fugiat ipsum in voluptatum id excepturi.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut harum aliquid temporibus repellat est voluptatibus ab, velit nisi. Quis magnam repellendus, autem ipsum in recusandae obcaecati amet rem. Labore, provident.
                </div>
            </div>
        </div>
    </Layout>
  )
}
