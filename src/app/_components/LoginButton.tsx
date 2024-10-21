"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
    return (
        <button
            className="text-white rounded-full py-2 px-4 border-green-400 border-2 hover:bg-green-400 transition-all duration-300"
            onClick={async () => {
                await signIn();
            }}
        >
            Login
        </button>
    );
}
