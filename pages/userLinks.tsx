import Layout from "@/components/Layout";
import { charm } from "@/utils";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import loadingGear from "../assets/Gear-0.2s-200px.svg";
import loadingGearWhite from "../assets/Gear-0.2s-200px white.svg";
import Link from "next/link";
import Image from "next/image";
import { UseThemeContext } from "@/context/StateProvider";

export default function userLinks() {
    const [links, setLinks] = useState<any[]>([]);
    const [loadingStatus, SetLoadingStatus] = useState('loading');
    const [loadingStatusRefresh, setLoadingStatusRefresh] = useState(false);
    const [loadingObjectId, setLoadingObjectId] = useState<any>({});
    const { data: session, status } = useSession();
    const [{ dark }] = UseThemeContext();

    const createLoadingObjectId = (linksArray: any) => {
        for (const links of linksArray) {
            for (const link in links) {
                if (link == "id") {
                    setLoadingObjectId({ ...loadingObjectId, [links[link]]: false })
                }
            }
        }
    }

    const fetchUserLinks = async () => {
        try {
            const getUserLinks = await fetch('http://localhost:3000/api/getUserLinks', {
                method: "POST",
                body: JSON.stringify({
                    email: session?.user?.email
                })
            });

            const userLinks = await getUserLinks.json();

            if (getUserLinks.status === 200) {
                SetLoadingStatus('fullfilled');
                createLoadingObjectId(userLinks);
                setLinks(userLinks);
                return userLinks;
            };

            throw new Error(userLinks);

        } catch (error) {
            SetLoadingStatus('empty');
            console.log(error)
        }
    }

    const filterLinks = (linksId: any) => {
        setLinks(vals => vals.filter(val => val.id !== linksId.id));

        const loadingObjectAsArray = Object.entries(loadingObjectId);
        const newloadingObjectAsArray = loadingObjectAsArray.filter(([key, value]) => key !== linksId.id);
        const newLoadingObject = Object.fromEntries(newloadingObjectAsArray);

        setLoadingObjectId(newLoadingObject);
    }

    const deleteLink = async (id: string) => {
        setLoadingObjectId({ ...loadingObjectId, [id]: true });
        try {
            const getDeleteLink = await fetch(`http://localhost:3000/api/deleteLink/${id}`);
            const linksId = await getDeleteLink.json();

            if (getDeleteLink.status === 200) {
                setLoadingObjectId({ ...loadingObjectId, [id]: false });
                return filterLinks(linksId);
            }

            throw new Error(linksId.message);

        } catch (error) {
            setLoadingObjectId({ ...loadingObjectId, [id]: false });
            console.log(error)
        }
    }

    const refreshLinks = async () => {
        setLoadingStatusRefresh(true);
        let linksTemp = await fetchUserLinks();

        if (JSON.stringify(links) !== JSON.stringify(linksTemp)) {
            setLinks(linksTemp);
        }

        setLoadingStatusRefresh(false);

    }

    useEffect(() => {
        if (status === "authenticated") {
            fetchUserLinks();
        }
    }, [status])

    return (
        <Layout>
            <div className="main">
                <div className={`header ${charm.className}`}>
                    <div className="title">User Links</div>
                    <div className="subtitle">below is your generated links</div>
                </div>
                <div className="body">
                    <div className="container">
                        <Button loading={loadingStatusRefresh} onClick={() => refreshLinks()}>
                            Refresh
                        </Button>
                    </div>
                    {
                        loadingStatus === "loading" ? (
                            <div className="container container--item-center">
                                <Image src={dark ? loadingGearWhite : loadingGear} alt="" />
                            </div>
                        ) : loadingStatus === 'empty' ? (
                            <div className="container container--item-center">
                                <span>no data</span>
                            </div>
                        ) : (
                            <div className="container">
                                {
                                    links?.map((link) => (
                                        <div key={link.id} className="container container--row container__item">
                                            <div className="container container--attached container__item__block container__item__block--grow-1">
                                                <span className="container__item__block__text container__item__block__text--sm">Shorten Link</span>
                                                <Link href={`/sortedLink/${link.id}`}>
                                                    <span className="container__item__block__text">shorten.io/api/{link.alias}</span>
                                                </Link>
                                            </div>
                                            <div className="container container--attached container__item__block">
                                                <span className="container__item__block__text container__item__block__text--sm">Counter</span>
                                                <span className="container__item__block__text">{link.counter}</span>
                                            </div>
                                            <div className="container container--attached container__item__block">
                                                <Button
                                                    onClick={() => deleteLink(link.id)}
                                                    loading={loadingObjectId[link.id]}
                                                    icon={true}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </Layout>
    )
}