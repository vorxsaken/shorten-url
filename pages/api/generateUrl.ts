import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'GET') return res.send(500);
    
    const prisma = new PrismaClient();
    const body = JSON.parse(req.body);
    const { url, user } = body;

    const pattern: RegExp = /^([https?:\/\/]+)?(w{3}.)?[\w+\W?]+\.[\w+]+[\w+\W?]?/;

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
                    counter: 0
                }
            })
            return res.status(200).send(shorten);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    return res.status(400).send({message: 'not url !!'});

}