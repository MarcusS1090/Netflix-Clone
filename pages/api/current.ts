import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        //vamos a limitarla a solo obtener request
        if (req.method !== 'GET') {
            return res.status(405).end();
        }
        //vamos a hacer fetch a nuestro current user usando serverAuth
        const { currentUser } = await serverAuth(req, res);

        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
        
    }
}