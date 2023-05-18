import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from '@/lib/prismadb';

//aqui vamos a proteger nuestras rutas a la hora de iniciar sesion
const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({ req });

    //vamos a ver si la session existe
    if (!session?.user?.email) {
        throw new Error('Not Signed in');
    }

    //vamos a ver si existe el usuario o fue eliminado
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    if (!currentUser) {
        throw new Error('Not signed in');
    }

    return { currentUser }
};

export default serverAuth;