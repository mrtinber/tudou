import { getServerSession } from "next-auth";
import Dashboard from "./_components/Dashboard";
import Header from "./_components/Header";
import { authConfig } from "@/lib/authConfig";
import { getTodos } from "@/actions/actions";
import { Task } from "./_components/NewTask";

export default async function Home() {
    const session = await getServerSession(authConfig);

    let userTodos: Task[] = []

    if(session) {
        userTodos = await getTodos(session.user.id)
        console.log('Fetched todos:', userTodos)
    }

    return (
        <>
            <Header session={session}/>
            <main className="w-[90%] m-auto mt-8">
                <Dashboard taskList={userTodos}/>
            </main>
        </>
    );
}
