declare module '@/lib/prisma' {
    import { PrismaClient } from '@prisma/client';
    const prisma: PrismaClient;
    export default prisma;
}