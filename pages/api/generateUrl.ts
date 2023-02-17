import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();

    const { url, user } = req.body;

    const alphabeticAndNumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let randomCode = '';
    for (let i = 0; i < 6; i++) {
        randomCode += alphabeticAndNumeric.charAt(Math.ceil(Math.random() * alphabeticAndNumeric.length));
    }

    try {
        const shorten = await prisma.shorten.create({
            data: {
                user: user ?? '',
                url: url,
                alias: randomCode,

            }
        })
        res.status(200).send(shorten);
    } catch (err) {
        res.status(500).send(err);
    }

    res.status(200).send({ message: 'url' })

}