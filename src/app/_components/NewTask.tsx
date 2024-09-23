"use client";

import { useState } from "react";

type Props = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export interface Task {
    content: string;
    importanceLevel: number;
    difficultyLevel: number;
    days?: string[];
}

export default function NewTask({ setTasks }: Props) {
    const [newTask, setNewTask] = useState<Task>({
        content: "",
        difficultyLevel: 3,
        importanceLevel: 3,
    });
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (newTask.content.trim() === "") return;

        console.log("New task submitted.");
        setTasks((prev) => [...prev, newTask]);
        setNewTask({
            content: "",
            difficultyLevel: 3,
            importanceLevel: 3,
            days: [],
        });
        setSelectedDays([]);

        event.currentTarget.reset();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask((prev) => ({ ...prev, content: event.target.value }));
    };

    const handleImportance = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask((prev) => ({
            ...prev,
            importanceLevel: parseInt(event.target.value),
        }));
    };

    const handleDifficulty = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask((prev) => ({
            ...prev,
            difficultyLevel: parseInt(event.target.value),
        }));
    };

    const handleDaysSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setSelectedDays((prev) =>
            checked ? [...prev, value] : prev.filter((day) => day !== value)
        );
        setNewTask((prev) => ({
            ...prev,
            days: checked
                ? [...(prev.days || []), value]
                : (prev.days || []).filter((day) => day !== value),
        }));
    };

    return (
        <>
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
                        value={newTask.content}
                        className="w-full p-1 text-black rounded-md"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <p>Select your days:</p>
                    <div className="flex gap-4">
                        {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday",
                        ].map((day) => (
                            <label
                                key={day}
                                htmlFor={`daysSelect-${day}`}
                                className={`rounded-full px-4 py-1 ${
                                    selectedDays.includes(day)
                                        ? "bg-slate-800"
                                        : "bg-slate-600"
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    name="daysSelect"
                                    id={`daysSelect-${day}`}
                                    value={day}
                                    onChange={handleDaysSelect}
                                    className="hidden"
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="importanceLevel">
                        Select level of importance:
                    </label>
                    <input
                        type="range"
                        id="importanceLevel"
                        name="importanceLevel"
                        min="1"
                        max="5"
                        step="1"
                        value={newTask.importanceLevel}
                        onChange={handleImportance}
                    />
                </div>

                <div>
                    <label htmlFor="difficultyLevel">
                        Select level of difficulty to achieve:
                    </label>
                    <input
                        type="range"
                        id="difficultyLevel"
                        name="difficultyLevel"
                        min="1"
                        max="5"
                        step="1"
                        value={newTask.difficultyLevel}
                        onChange={handleDifficulty}
                    />
                </div>

                <button type="submit" className="bg-slate-700 rounded-md w-1/4">
                    Create new task
                </button>
            </form>
        </>
    );
}
