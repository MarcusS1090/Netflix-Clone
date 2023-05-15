import { PrismaClient } from "@prisma/client";

//la razon por la que hacemos esto es que NextJS es hotPreloading
//hotPreloading es cada que nuestro codigo hace alguna actualizacion la ejecutaremos
//de inmediato 

//aqui salvamos prisma client como un archivo global que no son afectados por hot realoding
const client = global.prismadb || new PrismaClient();

//aqui nos aseguramos que todo este normal
if (process.env.NODE_ENV === 'production') global.prismadb = client;

export default client;