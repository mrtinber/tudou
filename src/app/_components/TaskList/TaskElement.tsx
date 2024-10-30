"use client";

import { useEffect, useState } from "react";
import {
    FaRegCheckCircle,
    FaRegCircle,
    FaRegTimesCircle,
} from "react-icons/fa";
import { Task } from "../../../../types/task";

type TaskElementProps = Task & {
    onDelete: () => void;
    handleToggleAchieved: (isAchieved: boolean) => void;
};

export default function TaskElement({
    content,
    importanceLevel,
    difficultyLevel,
    days,
    onDelete,
    isAchieved,
    handleToggleAchieved,
}: TaskElementProps) {
    const [isCompleted, setIsCompleted] = useState(isAchieved);
    const [achievedDays, setAchievedDays] = useState<string[]>(
        isAchieved ? days : []
    );
    const [isOpen, setIsOpen] = useState(false);

    const toggleTask = () => {
        const newState = !isCompleted;
        setIsCompleted(newState);
        if (newState) {
            setAchievedDays(days);
        } else {
            setAchievedDays([]);
        }
    };

    const handleAchievement = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setAchievedDays((prev) =>
            checked ? [...prev, value] : prev.filter((day) => day !== value)
        );
    };

    const handleKeyDownDays = (
        event: React.KeyboardEvent<HTMLElement>,
        day: string
    ) => {
        if (event.key === "Enter" || event.key === " ") {
            const isChecked = achievedDays.includes(day);

            setAchievedDays((prev) =>
                isChecked ? prev.filter((d) => d !== day) : [...prev, day]
            );

            event.preventDefault();
        }
    };

    useEffect(() => {
        // Initialisation unique lors du premier chargement si la tâche est déjà accomplie
        if (isAchieved) {
            return;
        }
    }, [isAchieved]);

    useEffect(() => {
        if (
            achievedDays.length > 0 &&
            days.every((day) => achievedDays.includes(day))
        ) {
            setIsCompleted(true);
        } else {
            setIsCompleted(false);
        }
    }, [achievedDays, days]);

    useEffect(() => {
        handleToggleAchieved(isCompleted);
    }, [isCompleted]);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            tabIndex={0}
            onClick={(e) => e.target === e.currentTarget && toggleOpen()}
            className={`px-2 bg-secondary ${
                isOpen ? "rounded-xl py-3" : "rounded-2xl py-1"
            } text-accent-foreground flex items-center justify-between hover:bg-secondary/60 transition-all duration-300 ease-in-out`}
        >
            <div className={`flex gap-4 items-center`}>
                {isCompleted ? (
                    <FaRegCheckCircle
                        onClick={toggleTask}
                        tabIndex={0}
                        aria-label="Mark task as incomplete"
                        className="text-primary cursor-pointer"
                        role="button"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                toggleTask();
                            }
                        }}
                    />
                ) : (
                    <FaRegCircle
                        onClick={toggleTask}
                        aria-label="Mark task as incomplete"
                        tabIndex={0}
                        className="cursor-pointer"
                        role="button"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                toggleTask();
                            }
                        }}
                    />
                )}

                <div
                    className={`gap-4 ${
                        isOpen ? "flex flex-col" : "flex flex-row items-center"
                    }`}
                >
                    <p
                        className={
                            isCompleted
                                ? "line-through text-secondary-foreground"
                                : ""
                        }
                        tabIndex={0}
                    >
                        {content}
                    </p>
                    <div
                        tabIndex={0}
                        className={`${
                            isOpen ? "self-start" : "hidden"
                        } md:inline-block text-xs border-2 border-foreground px-2 rounded-full font-bold`}
                    >
                        {isOpen && <span className="inline">Difficulty:</span>}{" "}
                        {difficultyLevel === 5
                            ? "Epic"
                            : difficultyLevel === 4
                            ? "Hard"
                            : difficultyLevel === 3
                            ? "Average"
                            : difficultyLevel === 2
                            ? "Easy"
                            : "Effortless"}
                    </div>
                    <div
                        tabIndex={0}
                        className={`${
                            isOpen ? "self-start" : "hidden"
                        } md:inline-block text-xs border-2 border-foreground px-2 rounded-full font-bold`}
                    >
                        {isOpen && <span className="inline">Importance:</span>}{" "}
                        {importanceLevel === 5
                            ? "Urgent"
                            : importanceLevel === 4
                            ? "Quite important"
                            : importanceLevel === 3
                            ? "Moderate"
                            : importanceLevel === 2
                            ? "Can wait"
                            : "Optional"}
                    </div>
                    <fieldset className="flex gap-2">
                        <legend className="hidden">
                            Cross the days that you completed
                        </legend>
                        {days.map((day, index) => (
                            <label
                                key={index}
                                tabIndex={0}
                                className={`${
                                    isOpen ? "" : "hidden"
                                } md:block rounded-full px-2 text-sm text-primary-foreground cursor-pointer ${
                                    achievedDays.includes(day)
                                        ? "bg-primary/50 line-through"
                                        : "bg-primary"
                                }`}
                                role="button"
                                onKeyDown={(event) =>
                                    handleKeyDownDays(event, day)
                                }
                            >
                                <input
                                    type="checkbox"
                                    name="daysSelect"
                                    value={day}
                                    onChange={handleAchievement}
                                    checked={achievedDays.includes(day)}
                                    className="hidden"
                                />
                                {day}
                            </label>
                        ))}
                    </fieldset>
                </div>
            </div>
            <FaRegTimesCircle
                className="hover:scale-110 transition-all duration-500 hover:text-destructive cursor-pointer"
                onClick={onDelete}
                tabIndex={0}
                aria-label="Delete task"
                role="button"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onDelete();
                    }
                }}
            />
        </div>
    );
}
