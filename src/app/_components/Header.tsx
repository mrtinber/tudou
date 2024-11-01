"use client"

import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

type HeaderProps = {
    session: Session | null;
};

export default function Header({ session }: HeaderProps) {
    const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);

    useEffect(() => {
        if (session) {
            const hasLoggedInBefore =
                sessionStorage.getItem("hasLoggedInBefore");
            if (!hasLoggedInBefore) {
                setIsFirstLogin(true);
                sessionStorage.setItem("hasLoggedInBefore", "true");
            }
        }
    }, [session]);

    return (
        <header className="py-4 md:px-8 w-[90%] m-auto md:w-full flex justify-between items-center">
            <h1 className="text-4xl font-anton">
                TuDou <span className="hidden md:inline">- ToDoList Maker</span>
            </h1>
            {session ? (
                <div className="flex items-center gap-4">
                    <div className="hidden md:block font-light text-md">
                        {isFirstLogin
                            ? `Welcome ${session.user.name} !`
                            : `Welcome back, ${session.user.name}`}
                    </div>
                    {session.user?.image && (
                        <img
                            src={session.user?.image}
                            alt={`Image de profil de ${session.user.name}`}
                            className="w-8 h-8 rounded-full"
                        />
                    )}
                    <LogoutButton />
                </div>
            ) : (
                <LoginButton className="" />
            )}
        </header>
    );
}
