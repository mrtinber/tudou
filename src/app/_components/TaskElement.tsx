"use client";

import { useEffect, useState } from "react";
import {
    FaRegCheckCircle,
    FaRegCircle,
    FaRegTimesCircle,
} from "react-icons/fa";
import { Task } from "./NewTask";

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

    return (
        <div
            tabIndex={0}
            className="px-2 py-1 bg-foreground rounded-full text-background flex items-center justify-between hover:scale-[101%] transition-all duration-300"
        >
            <div className="flex gap-4 items-center">
                {isCompleted ? (
                    <FaRegCheckCircle
                        onClick={toggleTask}
                        tabIndex={0}
                        aria-label="Mark task as incomplete"
                        className="text-primary cursor-pointer"
                        role="button"
                        onKeyDown={(e) => {if(e.key === "Enter"){toggleTask()}}}
                    />
                ) : (
                    <FaRegCircle
                        onClick={toggleTask}
                        aria-label="Mark task as incomplete"
                        tabIndex={0}
                        className="cursor-pointer"
                        role="button"
                        onKeyDown={(e) => {if(e.key === "Enter"){toggleTask()}}}
                    />
                )}

                <p
                    className={isCompleted ? "line-through text-secondary-foreground" : ""}
                    tabIndex={0}
                >
                    {content}
                </p>
                <div tabIndex={0} className="hidden md:block text-sm font-bold text-primary brightness-[70%]">
                    <span className="hidden lg:inline">Difficulty:</span>{" "}
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
                <div tabIndex={0} className="hidden md:block text-sm font-bold text-primary">
                    {/* <span className="hidden lg:inline">Importance:</span>{" "} */}
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
                            className={`hidden md:block rounded-full px-2 text-sm text-foreground cursor-pointer ${
                                achievedDays.includes(day)
                                    ? "bg-primary/50 line-through"
                                    : "bg-primary"
                            }`}
                                role="button"
                                onKeyDown={(event) => handleKeyDownDays(event, day)}
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
            <FaRegTimesCircle
                className="hover:scale-110 transition-all duration-500 text-destructive cursor-pointer"
                onClick={onDelete}
                tabIndex={0}
                aria-label="Delete task"
                role="button"
                onKeyDown={(e) => {if(e.key === "Enter"){onDelete()}}}
            />
        </div>
    );
}
