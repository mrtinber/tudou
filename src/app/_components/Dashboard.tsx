"use client";

import { useState } from "react";
import TaskList from "./TaskList";
import NewTask, { Task } from "./NewTask";

type DashboardProps = {
    taskList: Task[],
}

export default function Dashboard({ taskList }: DashboardProps) {
    const [tasks, setTasks] = useState<Task[]>(taskList);

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            <NewTask setTasks={setTasks} className="w-full lg:w-1/3"/>
            <TaskList tasks={tasks} setTasks={setTasks} className="w-full lg:w-2/3" />
        </div>
    );
}
