import { getServerSession } from "next-auth";
import Dashboard from "./_components/Dashboard";
import Header from "./_components/Header";
import { authConfig } from "@/lib/authConfig";
import { getTodos } from "@/actions/actions";
import { Task } from "./_components/NewTask";
import LoginButton from "./_components/LoginButton";

export default async function Home() {
    const session = await getServerSession(authConfig);

    let userTodos: Task[] = [];

    if (session) {
        userTodos = await getTodos(session.user.id);
        console.log("Fetched todos:", userTodos);
    }

    return (
        <>
            <Header session={session} />
            <main className="w-[90%] m-auto mt-8">
                {session ? (
                    <Dashboard taskList={userTodos} />
                ) : (
                    <div className="w-full py-32 gap-8 flex flex-col items-center justify-center">
                        <h2 className="text-6xl lg:text-8xl font-light text-center">Welcome to Tudou!</h2>
                        <h3 className="text-lg md:text-xl font-sans font-light">Please login first to access the tool.</h3>
                        <LoginButton className="w-64" aria-label="Login to access your dashboard"/>
                    </div>
                )}
            </main>
        </>
    );
}
