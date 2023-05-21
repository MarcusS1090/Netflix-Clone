import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        //aqui le decimos que si no es un metodo get entonces que termine la llamada
        if (req.method !== 'GET') {
            return res.status(405).end();
        }
        await serverAuth(req, res);

        const { movieId } = req.query;

        if (typeof movieId !== 'string') {
            throw new Error('Invalid ID');
        }

        //aqui le decimos que si no esta movieId entonces que mande un error
        if (!movieId) {
            throw new Error('Invalid ID');
        }

        //aqui vamos a encontrar el id de la base de datos
        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });
        //retornamos la llamada
        return res.status(200).json(movie);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}