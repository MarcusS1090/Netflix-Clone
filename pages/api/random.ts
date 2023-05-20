import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    //aqui le decimos que si hay una peticion tipo GET que no la realice
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        //aqui vamos a ver que la session este activa para poder mostrar nuestras peliculas
        await serverAuth(req);

        //aqui vamos a hacer el random movie para cada vez que refrescamos la pagina
        const movieCount = await prismadb.movie.count();
        const randomIndex = Math.floor(Math.random() * movieCount);

        //aqui vamos a encontrar nuestra pelicula random desde la base de datos
        const randomMovies = await prismadb.movie.findMany({
            take:1,
            skip: randomIndex
        });

        //aqui solo vamos a escoger una sola pelicula
        return res.status(200).json(randomMovies[0]);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
        
    }
}