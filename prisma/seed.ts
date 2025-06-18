// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//     await prisma.user.upsert({
//         where: { correoElectronico: "admin@gmail.com" },
//         update: {},
//         create: {
//             nombre: "Admin",
//             correoElectronico: "admin@gmail.com",
//             contrasena: "admin123",
//             rol: "ADMIN",
//         },
//     });
// }

// main()
//     .catch((e) => {
//         console.error("Error en el seed:", e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });