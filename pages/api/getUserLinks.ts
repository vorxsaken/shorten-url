import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body);
    const { email } = body;

    const prisma = new PrismaClient();

    const session = await getServerSession(req, res, authOptions);

    if (session && email) {
        try {
            const getUserLink = await prisma.shorten.findMany({
                where: {
                    user: email
                }
            });

            if(getUserLink.length > 0) return res.status(200).send(getUserLink);

            throw new Error('no data');

        } catch (err) {
            return res.status(500).send(err);
        }
    }

    res.status(511).send({ message: 'need authentication'});

}