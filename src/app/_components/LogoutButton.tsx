"use client";

import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
    return (
        <button
            className="text-foreground hover:text-destructive-foreground text-sm rounded-full py-2 px-4 border-destructive border-2 hover:bg-destructive transition-all duration-300"
            onClick={async () => {
                await signOut();
            }}
        >
            <FaSignOutAlt className="md:hidden" size={16}/>
            <span className="hidden md:block">Logout</span>
        </button>
    );
}
