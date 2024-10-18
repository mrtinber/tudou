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
        <div className="flex flex-col gap-4">
            <TaskList tasks={tasks} setTasks={setTasks} />
            <NewTask setTasks={setTasks} />
        </div>
    );
}
