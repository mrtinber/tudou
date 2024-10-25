"use client";

import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
    return (
        <button
            className="text-white text-sm rounded-full py-2 px-4 border-red-400 border-2 hover:bg-red-400 transition-all duration-300"
            onClick={async () => {
                await signOut();
            }}
        >
            <FaSignOutAlt className="md:hidden" size={16}/>
            <span className="hidden md:block">Logout</span>
        </button>
    );
}
