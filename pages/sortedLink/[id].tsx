import Button from "@/components/Button";
import { PrismaClient } from "@prisma/client";
import Layout from "@/components/Layout";
import { charm, currentDate } from "@/utils";
import { MdOutlineContentCopy, MdCheckCircle } from "react-icons/md";
import { useState } from "react"
import {QRCode} from 'react-qrcode-logo'

export default function sortedLink({ alias }: { alias: string }) {
    const [isCopy, setIsCopy] = useState(false);
    const shortentextValue = `shorten.io/api/${alias}`

    const copyToClipboard = () => {
        setIsCopy((v) => !v);
        navigator.clipboard.writeText(shortentextValue);

        setTimeout(() => {
            setIsCopy((v) => !v)
        }, 3000)
    }

    const download = () => {
        const qrcode = document.getElementById('qrcode') as HTMLCanvasElement;
        const link = document.createElement('a') as HTMLAnchorElement;

        link.download = `${ currentDate() } shorten qrcode.png`;
        link.href = qrcode?.toDataURL();
        link.click();
    }

    return (
        <Layout>
            <div className="main">
                <div className={`header ${charm.className}`}>
                    <p className='title'>Generated</p>
                    <p>url successfuly generated</p>
                </div>
                <div className="body">
                    <div className="copyField">
                        <div data-iscopy={isCopy} className="icons">
                            {
                                isCopy ? (
                                    <MdCheckCircle
                                    />
                                ) : (
                                    <MdOutlineContentCopy
                                        onClick={() => copyToClipboard()}
                                    />
                                )
                            }
                            <span>copy url</span>
                        </div>
                        <input
                            value={shortentextValue}
                            type="text"
                            disabled
                        />
                    </div>
                    <div className="qrcodeContainer">
                        <div className="qrcode">
                            <QRCode 
                            id="qrcode"
                            value={shortentextValue} 
                            bgColor="rgba(255, 255, 255, 0%)" 
                            size={250} />
                        </div>
                        <Button onClick={() => download()}>Download</Button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
    const prisma = new PrismaClient();

    const getShortenData = await prisma.shorten.findUnique({
        where: {
            id: params.id
        }
    })

    return {
        props: { alias: getShortenData?.alias }
    }
}