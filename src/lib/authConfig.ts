import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "@/app/lib/prisma";
import { Adapter } from "next-auth/adapters";

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;

const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;

if (!githubId || !githubSecret || !googleId || !googleSecret) {
    throw new Error("Missing GITHUB_ID or GITHUB_SECRET.");
} else {
    console.log(githubId);
}

export const authConfig: NextAuthOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    adapter: PrismaAdapter(prisma) as Adapter,
    callbacks: {
        async session({ session }) {
            // Récupérer l'utilisateur complet via Prisma, y compris ses champs supplémentaires
            const userFromDB = await prisma.user.findUnique({
                where: { email: session.user.email }, // ou id si tu as l'ID
              });

            if (userFromDB && session.user) {
                session.user.id = userFromDB.id;
                session.user.emailVerified = userFromDB.emailVerified;
            }

            return session; // Retourne la session mise à jour
        },
    },
};
