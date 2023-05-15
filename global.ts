import {PrismaClient} from "@prisma/client";

//con esto solucionamos el error que salia en prismadb.ts
declare global {
    namespace globalThis {
        var prismadb: PrismaClient
    }
}