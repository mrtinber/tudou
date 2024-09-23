import { Task } from "./NewTask";
import TaskElement from "./TaskElement";

type Props = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function TaskList({ tasks, setTasks }: Props) {
    const handleDelete = (indexToDelete: any) => {
        setTasks(tasks.filter((_, index) => index !== indexToDelete));
    };

    return (
        <>
            {tasks.length > 0 && (
                <div className="bg-stone-600 px-8 py-4 rounded-xl flex flex-col gap-2">
                    {tasks.map((task, index) => (
                        <TaskElement
                            content={task.content}
                            importanceLevel={task.importanceLevel}
                            difficultyLevel={task.difficultyLevel}
                            days={task.days ? task.days : []}
                            key={index}
                            onDelete={() => handleDelete(index)}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
