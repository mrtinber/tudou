import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import prisma from "@/app/lib/prisma";
import { Adapter } from "next-auth/adapters";

const githubId = process.env.NEXT_PUBLIC_GITHUB_ID;
const githubSecret = process.env.NEXT_PUBLIC_GITHUB_SECRET;

const googleId = process.env.NEXT_PUBLIC_GOOGLE_ID;
const googleSecret = process.env.NEXT_PUBLIC_GOOGLE_SECRET;

if (!githubId || !githubSecret || !googleId || !googleSecret) {
    throw new Error("Missing GITHUB_ID or GITHUB_SECRET.")
} else {
    console.log(githubId)
}

export const authConfig : NextAuthOptions = {
    providers : [
        Github({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
        }),
        Google({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
        }),
        Email({
            from: process.env.EMAIL_FROM as string,
            server: {
                host: process.env.SMTP_HOST as string, 
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER as string,
                    pass: process.env.SMTP_PASSWORD as string,
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma) as Adapter,
}