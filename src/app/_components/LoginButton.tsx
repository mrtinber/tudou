"use client";

import { signIn } from "next-auth/react";

type Props = {};

export default function LoginButton({}: Props) {
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
