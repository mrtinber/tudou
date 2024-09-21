import Dashboard from "./_components/Dashboard";
import Header from "./_components/Header";
import NewTask from "./_components/NewTask";

export default function Home() {
    return (
        <>
            <Header />
            <main className="w-1/2 m-auto">
                <Dashboard />
            </main>
        </>
    );
}
