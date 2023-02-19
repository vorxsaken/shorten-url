import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'GET') return res.send(500);
    
    const prisma = new PrismaClient();

    const { url, user } = req.body;

    const pattern: RegExp = /^([https?:\/\/]+)?(w{3}.)?[\w+]+\.[\w+]+[\w+\W?]?/;

    if (pattern.test(url)) {
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
            return res.status(200).send(shorten);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    res.status(400).send({ message: 'not url !!!' });

}