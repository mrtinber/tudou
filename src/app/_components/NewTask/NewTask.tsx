"use client";

import { createTask } from "@/actions/actions";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { RecordButton } from "./RecordButton";
import { Task } from "../../../../types/task";
import { SelectDays } from "./SelectDays";
import { SliderInput } from "./SliderInput";
import { SubmitButton } from "./SubmitButton";

type Props = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    className: string;
};

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
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsLoading(true);

        const session = await getSession();
        if (!session) {
            console.error("User is not authenticated");
            return;
        } else {
            console.log("User is connected.", session.user.id);
        }

        if (newTask.content.trim() === "") return;

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

        setIsLoading(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask((prev) => ({ ...prev, content: event.target.value }));
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
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                }
                            }}
                        />
                        <RecordButton setNewTask={setNewTask} />
                    </div>
                </div>

                <SelectDays
                    selectedDays={selectedDays}
                    setSelectedDays={setSelectedDays}
                    setNewTask={setNewTask}
                />

                <SliderInput
                    label="Select level of importance:"
                    ariaLabel="importanceLevel"
                    value={newTask.importanceLevel}
                    onValueChange={(value) =>
                        setNewTask((prev) => ({
                            ...prev,
                            importanceLevel: value,
                        }))
                    }
                />

                <SliderInput
                    label="Select level of difficulty:"
                    ariaLabel="difficultyLevel"
                    value={newTask.difficultyLevel}
                    onValueChange={(value) =>
                        setNewTask((prev) => ({
                            ...prev,
                            difficultyLevel: value,
                        }))
                    }
                />

                <SubmitButton isLoading={isLoading} newTask={newTask}/>
            </form>
        </>
    );
}
