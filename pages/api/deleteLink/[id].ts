import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const prisma = new PrismaClient();
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        try {
            await prisma.shorten.delete({
                where: {
                    id: id as string
                }
            })

            return res.status(200).send({ id: id })

        } catch (error) {

            return res.status(500).send({message: 'theres something wrong'})

        }
    }

    res.status(511).send({message: "authentication required"});

}