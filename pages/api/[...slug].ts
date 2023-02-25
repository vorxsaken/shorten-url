import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;
    const prisma = new PrismaClient();

    const getUrl = await prisma.shorten.findMany({
        where: {
            alias: slug?.at(0)
        }
    });

    if (getUrl.length > 0) {

        await prisma.shorten.updateMany({
            where: {
                alias: slug?.at(0)
            },
            data: {
                counter: {
                    increment: 1
                }
            }
        })

        res.writeHead(301, {
            "Location": getUrl[0].url
        })

        return res.end();
    }

    res.status(500);

}