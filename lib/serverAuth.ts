import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prismadb from '@/lib/prismadb';

//aqui vamos a proteger nuestras rutas a la hora de iniciar sesion
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    //vamos a ver si la session existe
    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    //vamos a ver si existe el usuario o fue eliminado
    if (!currentUser) {
        throw new Error('Not signed in');
    }
    
    return { currentUser };
    
};
export default serverAuth;