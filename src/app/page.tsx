import { getServerSession } from "next-auth";
import Dashboard from "./_components/Dashboard";
import Header from "./_components/Header";
import LoginButton from "./_components/LoginButton";
import { authConfig } from "@/lib/authConfig";
import LogoutButton from "./_components/LogoutButton";
import Image from "next/image";

export default async function Home() {
    const session = await getServerSession(authConfig);

    return (
        <>
            <Header />
            <main className="w-1/2 m-auto">
                <Dashboard />
                <LoginButton />
                <LogoutButton />
                {session && (
                    <div>
                        <p>Bienvenue {session.user?.name}</p>
                        <p>Email: {session.user?.email}</p>
                        {session.user?.image && <Image src={session.user?.image} alt="" className="w-16 h-16 rounded-full"/> }
                    </div>
                )}
            </main>
        </>
    );
}
