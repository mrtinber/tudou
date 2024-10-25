"use client";

import { signIn } from "next-auth/react";

export default function LoginButton({className}: {className: string}) {
    return (
        <button
            className={`text-foreground rounded-full py-2 px-4 border-primary border-2 hover:bg-primary transition-all duration-300 ${className}`}
            onClick={async () => {
                await signIn();
            }}
        >
            Login
        </button>
    );
}
