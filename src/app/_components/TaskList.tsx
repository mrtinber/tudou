import { deleteTodo, handleAchievement } from "@/actions/actions";
import { Task } from "./NewTask";
import TaskElement from "./TaskElement";

type TaskListProps = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    className: string;
};

export default function TaskList({ tasks, setTasks, className }: TaskListProps) {
    async function handleDelete(indexToDelete: string) {
        await deleteTodo(indexToDelete);

        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== indexToDelete));
    }

    async function handleToggleAchieved (idToToggle: string, isAchieved: boolean) {
        await handleAchievement(idToToggle, isAchieved);

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === idToToggle ? { ...task, isAchieved } : task
            )
        );
    };

    const achievedPercentage =
        (tasks.filter((task) => task.isAchieved).length * 100) / tasks.length;

    return (
        <>
            {tasks.length > 0 && (
                <>
                    <div className={`lg:px-8 py-4 rounded-xl flex flex-col gap-2 ${className}`}>
                        {tasks.map((task) => (
                            <TaskElement
                                key={task.id}
                                content={task.content}
                                importanceLevel={task.importanceLevel}
                                difficultyLevel={task.difficultyLevel}
                                days={task.days ? task.days : []}
                                onDelete={() =>
                                    handleDelete(task.id ? task.id : "")
                                }
                                isAchieved={task.isAchieved}
                                handleToggleAchieved={(newState: boolean) => handleToggleAchieved(task.id ? task.id : "", newState)}
                            />
                        ))}
                        <div className="flex gap-2 items-center">
                            <div className="w-full relative">
                                <div className="w-full h-2 bg-secondary rounded-full absolute" />
                                <div
                                    className="h-2 bg-primary rounded-full absolute"
                                    style={{ width: `${achievedPercentage}%` }}
                                    aria-label={`You have achieved ${achievedPercentage}% of your tasks.`}
                                    aria-live="polite"
                                    role="progressbar"
                                    aria-valuenow={achievedPercentage}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <p aria-live="polite">{achievedPercentage}%</p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
