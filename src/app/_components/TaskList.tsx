import { deleteTodo, handleAchievement } from "@/actions/actions";
import { Task } from "./NewTask";
import TaskElement from "./TaskElement";
import { useState } from "react";
import { SortingBar } from "./SortingBar";

type TaskListProps = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    className: string;
};

export default function TaskList({
    tasks,
    setTasks,
    className,
}: TaskListProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [filteredList, setFilteredList] = useState(tasks)

    async function handleDelete(indexToDelete: string) {
        setIsDeleting(true);

        try {
            await deleteTodo(indexToDelete);
            setTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== indexToDelete)
            );
        } catch (error) {
            console.error("Failure while deleting task:", error);
        } finally {
            setIsDeleting(false);
        }
    }

    async function handleToggleAchieved(
        idToToggle: string,
        isAchieved: boolean
    ) {
        await handleAchievement(idToToggle, isAchieved);

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === idToToggle ? { ...task, isAchieved } : task
            )
        );
    }

    const achievedPercentage =
        (tasks.filter((task) => task.isAchieved).length * 100) / tasks.length;
        
    return (
        <>
            {tasks.length > 0 && (
                <>
                    <SortingBar tasks={tasks} setFilteredList={setFilteredList}/>
                    <div
                        className={`relative lg:px-8 py-4 rounded-xl flex flex-col gap-2 ${className}`}
                    >
                        {isDeleting && (
                            <div className="absolute top-0 left-0 w-full h-full bg-background opacity-75"></div>
                        )}
                        {filteredList.map((task) => (
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
                                handleToggleAchieved={(newState: boolean) =>
                                    handleToggleAchieved(
                                        task.id ? task.id : "",
                                        newState
                                    )
                                }
                            />
                        ))}
                        <div className="flex gap-2 items-center">
                            <div className="w-full relative">
                                <div className="w-full h-2 bg-secondary rounded-full absolute" />
                                <div
                                    className="h-2 bg-primary rounded-full absolute transition-all duration-500"
                                    style={{ width: `${achievedPercentage}%` }}
                                    aria-label={`You have achieved ${achievedPercentage}% of your tasks.`}
                                    aria-live="polite"
                                    role="progressbar"
                                    aria-valuenow={achievedPercentage}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <p aria-live="polite">
                                {achievedPercentage.toFixed(0)}%
                            </p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
