"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
    return (
        <button
            className="bg-green-400 text-white rounded-lg p-2"
            onClick={async () => {
                await signIn();
            }}
        >
            Login
        </button>
    );
}
