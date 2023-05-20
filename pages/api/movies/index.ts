import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== 'GET' ) {
        return res.status(405).end();
    }

    try {
        await serverAuth(req);

        //para poder encontrar nuestras peliculas en la base de datos
        const movies = await prismadb.movie.findMany();

        return res.status(200).json(movies);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}