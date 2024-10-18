import { getServerSession } from "next-auth";
import Dashboard from "./_components/Dashboard";
import Header from "./_components/Header";
import LoginButton from "./_components/LoginButton";
import { authConfig } from "@/lib/authConfig";
import LogoutButton from "./_components/LogoutButton";
import { getTodos } from "@/actions/actions";
import { Task } from "./_components/NewTask";

export default async function Home() {
    const session = await getServerSession(authConfig);

    let userTodos: Task[] = []

    if(session) {
        userTodos = await getTodos(session.user.id)
        console.log(userTodos)
    }

    return (
        <>
            <Header />
            <main className="w-1/2 m-auto">
                <Dashboard taskList={userTodos}/>
                {session ? (
                    <div>
                        <p>Bienvenue {session.user?.name}</p>
                        <p>Email: {session.user?.email}</p>
                        {session.user?.image && (
                            <img
                                src={session.user?.image}
                                alt=""
                                className="w-16 h-16 rounded-full"
                            />
                        )}
                        {/* <p>Ma liste: </p>
                        <ul>
                            {userTodos.map((todo: Task) => (
                                <li key={todo.id}>{todo.content}</li>
                            ))}
                        </ul> */}
                        <LogoutButton />
                    </div>
                ) : (
                    <LoginButton />
                )}
            </main>
        </>
    );
}
