"use client";

import { createTask } from "@/actions/actions";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { FaMicrophone } from "react-icons/fa6";

type Props = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    className: string,
};

export interface Task {
    id?: string;
    content: string;
    importanceLevel: number;
    difficultyLevel: number;
    days: string[];
    isAchieved: boolean;
    userId?: string;
}

export default function NewTask({ setTasks, className }: Props) {
    const [newTask, setNewTask] = useState<Task>({
        content: "",
        difficultyLevel: 3,
        importanceLevel: 3,
        days: [],
        isAchieved: false,
        userId: "",
    });
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const session = await getSession();
        if (!session) {
            console.error("User is not authenticated");
            return;
        } else {
            console.log("User is connected.", session.user.id);
        }

        if (newTask.content.trim() === "") return;

        console.log("New task submitted.");

        const formData = new FormData();
        formData.append("content", newTask.content);
        formData.append("difficultyLevel", newTask.difficultyLevel.toString());
        formData.append("importanceLevel", newTask.importanceLevel.toString());
        selectedDays.forEach((day) => formData.append("daysSelect", day));
        formData.append("isAchieved", newTask.isAchieved.toString());
        formData.append("user", session.user.id);

        try {
            // On appelle l'action, qui gère la création de la tâche et la manipulation d'état
            const createdTask = await createTask(formData);

            // On met à jour l'état avec les tâches renvoyées par l'action
            setTasks((prev) => [...prev, createdTask]);

            // Réinitialiser le formulaire
            setNewTask({
                content: "",
                difficultyLevel: 3,
                importanceLevel: 3,
                days: [],
                isAchieved: false,
                userId: "",
            });
            setSelectedDays([]);
        } catch (error) {
            console.error("Error creating task:", error);
        }

        // event.currentTarget.reset();
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

    const handleRecord = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onresult = async function (event) {
            const transcript = event.results[0][0].transcript;
            console.log("La transcription: ", transcript);
            setNewTask((prev) => ({ ...prev, content: transcript }));
        };

        recognition.start();
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className={`mx-auto flex flex-col gap-4 bg-stone-900 px-4 md:px-8 py-4 rounded-xl ${className}`}
            >
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="newTask">New Task</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="newTask"
                            name="content"
                            placeholder="Type something..."
                            value={newTask.content}
                            className="w-full py-1 px-4 text-black rounded-full"
                            onChange={handleChange}
                        />
                        <button
                            onClick={handleRecord}
                            className="text-white bg-slate-700 disabled:bg-gray-500 hover:bg-red-400 hover:scale-105 focus:ring-4 focus:ring-blue-300 rounded-full px-2 transition-all duration-300"
                        >
                            <FaMicrophone />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p>Select your days:</p>
                    <div className="flex gap-4 flex-wrap">
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
                                className={`rounded-full px-4 py-1 cursor-pointer hover:scale-105 transition-all duration-300 ${
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
                    <br />
                    <div className="flex gap-2">
                        <span>Low</span>
                        <input
                            type="range"
                            id="importanceLevel"
                            name="importanceLevel"
                            min="1"
                            max="5"
                            step="1"
                            value={newTask.importanceLevel}
                            onChange={handleImportance}
                            className="cursor-pointer"
                        />
                        <span>High</span>
                    </div>
                </div>

                <div>
                    <label htmlFor="difficultyLevel">
                        Select level of difficulty to achieve:
                    </label>
                    <br />
                    <div className="flex gap-2">
                        <span>Low</span>
                        <input
                            type="range"
                            id="difficultyLevel"
                            name="difficultyLevel"
                            min="1"
                            max="5"
                            step="1"
                            value={newTask.difficultyLevel}
                            onChange={handleDifficulty}
                            className="cursor-pointer"
                        />
                        <span>High</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="rounded-full w-60 xl:w-72 py-2 mx-auto border-2 border-slate-700 hover:bg-slate-700 translation-all duration-300"
                    // className="inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white data-[disabled]:bg-gray-950 data-[hover]:bg-gray-800 data-[disabled]:opacity-40"
                >
                    Create new task
                </button>
            </form>
        </>
    );
}
