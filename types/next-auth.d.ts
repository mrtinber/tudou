import NextAuth from "next-auth";
import { Todo } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      emailVerified?: Date | null;
      todos?: Todo[]
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    emailVerified?: Date;
  }
}
