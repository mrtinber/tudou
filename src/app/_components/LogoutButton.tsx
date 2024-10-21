"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            className="text-white text-sm rounded-full py-2 px-4 border-red-400 border-2 hover:bg-red-400 transition-all duration-300"
            onClick={async () => {
                await signOut();
            }}
        >
            Logout
        </button>
    );
}
