import { Task } from "./NewTask";
import TaskElement from "./TaskElement";

type TaskListProps = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function TaskList({ tasks, setTasks }: TaskListProps) {
    const handleDelete = (indexToDelete: number) => {
        setTasks(tasks.filter((_, index) => index !== indexToDelete));
    };

    const handleToggleAchieved = (index: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task, i) =>
                i === index ? { ...task, isAchieved: !task.isAchieved } : task
            )
        );
    };

    const achievedPercentage =
        (tasks.filter((task) => task.isAchieved).length * 100) / tasks.length;

    return (
        <>
            {tasks.length > 0 && (
                <>
                    <div className="bg-stone-600 px-8 py-4 rounded-xl flex flex-col gap-2">
                        {tasks.map((task, index) => (
                            <TaskElement
                                content={task.content}
                                importanceLevel={task.importanceLevel}
                                difficultyLevel={task.difficultyLevel}
                                days={task.days ? task.days : []}
                                key={index}
                                onDelete={() => handleDelete(index)}
                                isAchieved={task.isAchieved}
                                handleToggleAchieved={() =>
                                    handleToggleAchieved(index)
                                }
                            />
                        ))}
                        <div className="flex gap-2 items-center">
                            <div className="w-full relative">
                                <div className="w-full h-2 bg-slate-200 rounded-full absolute" />
                                <div
                                    className="h-2 bg-slate-500 rounded-full absolute"
                                    style={{ width: `${achievedPercentage}%` }}
                                />
                            </div>
                            <p>{achievedPercentage}%</p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
