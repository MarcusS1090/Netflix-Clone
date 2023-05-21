import { NextApiRequest, NextApiResponse } from "next";
import { without } from 'lodash';

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            //vamos a llamar nuestro usuario
            const { currentUser } = await serverAuth(req, res);

            //vamos a requerir desde la pai el id de las peliculas
            const { movieId } = req.body;

            //vamos a traer el id de la pelicula desde la base de datos
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                },
            });

            //vamos a controlar que pasa si no existe la pelicula o no encuentra el id
            if (!existingMovie) {
                throw new Error('Invalid ID');
            }

            //vamos a actualizar nuestro user y vamos a hacer push al id de la pelicula
            //en favorites
            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: {
                        push: movieId
                    }
                }
            });

            return res.status(200).json(user);
        }

        //vamos a hacer un handler para un DELE req cuando el usuario quiera quitar una pelicula de sus
        //favoritos
        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req, res);

            const { movieId } = req.query as {movieId: string};

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            //aqui vamos a hacer una condicion por si no existe la pelicula
            if (!existingMovie) {
                throw new Error('Invalid ID');
            }

            //vamos a actualizar nuestra lista de favoritesID
            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

            //vamos a actualizar el usuario
            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: updatedFavoriteIds,
                }
            });

            return res.status(200).json(updatedUser);
        }

        //vamos a retornar por si quieren hacer otro tipo de peticion que no sea la que dimos autorizacion
        return res.status(405).end();
        
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}