"use client";

import { useState } from "react";
import TaskList from "./TaskList";
import NewTask, { Task } from "./NewTask";

type Props = {};

export default function Dashboard({}: Props) {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <div className="flex flex-col gap-4">
            <TaskList tasks={tasks} setTasks={setTasks} />
            <NewTask setTasks={setTasks} />
        </div>
    );
}
