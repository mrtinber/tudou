"use client";

import { createTask } from "@/actions/actions";
import { Slider } from "@/components/ui/slider";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { FaMicrophone } from "react-icons/fa6";

type Props = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    className: string;
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
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask((prev) => ({ ...prev, content: event.target.value }));
    };

    // const handleImportance = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setNewTask((prev) => ({
    //         ...prev,
    //         importanceLevel: parseInt(event.target.value),
    //     }));
    // };

    // const handleDifficulty = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setNewTask((prev) => ({
    //         ...prev,
    //         difficultyLevel: parseInt(event.target.value),
    //     }));
    // };

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

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLElement>,
        day: string
    ) => {
        if (event.key === "Enter" || event.key === " ") {
            const isChecked = selectedDays.includes(day);

            setSelectedDays((prev) =>
                isChecked ? prev.filter((d) => d !== day) : [...prev, day]
            );

            setNewTask((prev) => ({
                ...prev,
                days: isChecked
                    ? (prev.days || []).filter((d) => d !== day)
                    : [...(prev.days || []), day],
            }));

            event.preventDefault();
        }
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
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className={`mx-auto flex flex-col gap-4 bg-secondary px-4 md:px-8 py-4 rounded-xl ${className}`}
                aria-labelledby="new-task-form"
            >
                <h2 id="new-task-form" className="text-xl font-semibold">
                    Your new task
                </h2>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="newTask" className="sr-only">
                        Content:
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="newTask"
                            name="content"
                            placeholder="Type something you have to do..."
                            aria-label="Task content input"
                            aria-required="true"
                            value={newTask.content}
                            className="w-full py-1 px-4 text-foreground bg-input rounded-full"
                            onChange={handleChange}
                        />
                        <button
                            onClick={handleRecord}
                            aria-label="Start recording"
                            className="bg-primary text-primary-foreground disabled:bg-secondary hover:bg-destructive hover:text-destructive-foreground hover:scale-105 focus:ring-4 focus:ring-primary/50 rounded-full px-2 transition-all duration-300"
                        >
                            <FaMicrophone />
                        </button>
                    </div>
                </div>

                <fieldset
                    className="flex flex-col gap-2"
                    role="group"
                    aria-labelledby="days-selection"
                    tabIndex={0}
                >
                    <legend id="days-selection" className="pb-2">
                        Select your days:
                    </legend>
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
                                className={`rounded-full px-4 py-1 cursor-pointer hover:scale-105 transition-all duration-300 text-primary-foreground ${
                                    selectedDays.includes(day)
                                        ? "bg-primary"
                                        : "bg-primary/50"
                                }`}
                                aria-label={`Select ${day}`}
                                tabIndex={0}
                                role="button"
                                onKeyDown={(event) => handleKeyDown(event, day)}
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
                </fieldset>

                <div>
                    <label htmlFor="importanceLevel">
                        Select level of importance:
                    </label>
                    <br />
                    <div className="flex gap-2">
                        <span>Low</span>
                        <Slider 
                            id="importanceLevel"
                            name="importanceLevel"
                            min={1}
                            max={5}
                            step={1}
                            value={[newTask.importanceLevel]}
                            onValueChange={(value) => setNewTask((prev) => ({ ...prev, importanceLevel: value[0] }))}
                            className="cursor-pointer custom-range"
                            aria-valuenow={newTask.importanceLevel}
                            aria-valuemin={1}
                            aria-valuemax={5}
                            aria-label="Importance level"
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
                        <Slider 
                            id="difficultyLevel"
                            name="difficultyLevel"
                            min={1}
                            max={5}
                            step={1}
                            value={[newTask.difficultyLevel]}
                            onValueChange={(value) => setNewTask((prev) => ({ ...prev, difficultyLevel: value[0] }))}
                            className="cursor-pointer custom-range"
                            aria-valuenow={newTask.difficultyLevel}
                            aria-valuemin={1}
                            aria-valuemax={5}
                            aria-label="Difficulty level"
                        />
                        <span>High</span>
                    </div>
                </div>

                <button
                    type="submit"
                    aria-label="Create new task and add it to the list"
                    className="rounded-full w-60 xl:w-72 py-2 mx-auto border-2 border-primary hover:bg-primary hover:text-primary-foreground translation-all duration-300"
                >
                    Create new task
                </button>
            </form>
        </>
    );
}
