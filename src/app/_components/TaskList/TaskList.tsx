import { deleteTodo, handleAchievement } from "@/actions/actions";
import TaskElement from "./TaskElement";
import { useEffect, useState } from "react";
import { SortingBar } from "./SortingBar";
import { ProgressBar } from "./ProgressBar";
import { Task } from "../../../../types/task";

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
    const [filteredList, setFilteredList] = useState(tasks);

    useEffect(() => {
        setFilteredList(tasks);
    }, [tasks]);

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

    return (
        <>
            {tasks.length > 0 && (
                <>
                    <SortingBar
                        tasks={tasks}
                        setFilteredList={setFilteredList}
                    />
                    <div
                        className={`relative lg:px-8 py-4 rounded-xl flex flex-col gap-2 ${className}`}
                    >
                        {isDeleting && (
                            <div className="absolute top-0 left-0 w-full h-full bg-background opacity-75 transition-opacity duration-300 ease-in-out"></div>
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
                        <ProgressBar tasks={tasks} />
                    </div>
                </>
            )}
        </>
    );
}
