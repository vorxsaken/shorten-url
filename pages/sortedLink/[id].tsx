import Button from "@/components/Button";
import { PrismaClient } from "@prisma/client";
import Layout from "@/components/Layout";
import { charm } from "@/utils";
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
                            <QRCode value={shortentextValue} size={250} />
                        </div>
                        <Button>Download</Button>
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