import Task from "./Task";

type Props = {
    tasks: string[],
    setTasks: React.Dispatch<React.SetStateAction<string[]>>,
};

export default function TaskList({ tasks, setTasks }: Props) {
    const handleDelete = (indexToDelete: any) => {
        setTasks(tasks.filter((_, index) => index !== indexToDelete))
    }

    return (
        <>
            {tasks.length > 0 && (
                <div className="bg-stone-600 px-8 py-4 rounded-xl flex flex-col gap-2">
                    {tasks.map((task, index) => (
                        <Task content={task} key={index} onDelete={() => handleDelete(index)}/>
                    ))}
                </div>
            )}
        </>
    );
}
