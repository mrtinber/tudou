"use client";

import { useState } from "react";
import TaskList from "./TaskList";
import NewTask, { Task } from "./NewTask";

type DashboardProps = {
    taskList: Task[];
};

export default function Dashboard({ taskList }: DashboardProps) {
    const [tasks, setTasks] = useState<Task[]>(taskList);

    return (
        <div
            className="flex flex-col lg:flex-row gap-4 h-screen"
            aria-label="Task dashboard"
        >
            <NewTask setTasks={setTasks} className="w-full lg:w-1/3 h-[475px]" />
            <section
                className="w-full lg:w-2/3"
                aria-live="polite"
                role="alert"
                aria-label="Task list"
            >
                <TaskList tasks={tasks} setTasks={setTasks} className="" />
            </section>
        </div>
    );
}
