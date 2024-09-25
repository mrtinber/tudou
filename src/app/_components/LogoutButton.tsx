"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            className="bg-red-400 text-white rounded-lg p-2"
            onClick={async () => {
                await signOut();
            }}
        >
            Logout
        </button>
    );
}
