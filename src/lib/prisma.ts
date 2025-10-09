import { PrismaClient } from "@/generated/prisma";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development, avoid creating multiple instances of Prisma Client
  // @ts-expect-error fdfdfd
  if (!global.prisma) {
    // @ts-expect-error fdfdfd
    global.prisma = new PrismaClient();
  }
  // @ts-expect-error fdfdfd
  prisma = global.prisma;
}

export { prisma };
