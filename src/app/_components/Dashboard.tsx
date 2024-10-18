"use client";

import { useState } from "react";
import TaskList from "./TaskList";
import NewTask, { Task } from "./NewTask";

type DashboardProps = {
    taskList: Task[],
}

export default function Dashboard({ taskList }: DashboardProps) {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <div className="flex flex-col gap-4">
            <TaskList tasks={taskList} setTasks={setTasks} />
            <NewTask setTasks={setTasks} />
        </div>
    );
}
