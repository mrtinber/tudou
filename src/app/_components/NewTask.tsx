"use client";

import React, { useState } from "react";

type Props = {};

export default function NewTask({}: Props) {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState<string>("");

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        
        if (newTask.trim() === "") return;
        
        console.log("New task submitted.");
        setTasks((prev) => [...prev, newTask.trim()]);
        setNewTask("");
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    };

    return (
        <>
            {tasks.length > 0 && (
                <ul className="bg-stone-600 px-8 py-4 rounded-xl list-disc list-inside">
                    {tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            )}
            <form
                action=""
                onSubmit={handleSubmit}
                className="mx-auto w-full flex flex-col gap-4 bg-stone-900 px-8 py-4 rounded-xl"
            >
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="newTask">New Task</label>
                    <input
                        type="text"
                        id="newTask"
                        name="New task"
                        placeholder="Type something..."
                        value={newTask}
                        className="w-full p-1 text-black"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="bg-slate-700 rounded-md">
                    Create new task
                </button>
            </form>
        </>
    );
}
