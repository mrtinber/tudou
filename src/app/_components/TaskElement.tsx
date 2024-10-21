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
    const [achievedDays, setAchievedDays] = useState<string[]>(isAchieved ? days : []);

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

    useEffect(() => {
        // Initialisation unique lors du premier chargement si la tâche est déjà accomplie
        if (isAchieved) {
            return;
        }
    }, [isAchieved]);

    useEffect(() => {
        if (achievedDays.length > 0 && days.every((day) => achievedDays.includes(day))) {
            setIsCompleted(true);
        } else {
            setIsCompleted(false);
        }
    }, [achievedDays, days]);

    useEffect(() => {
        handleToggleAchieved(isCompleted);
    }, [isCompleted]);

    return (
        <div className="px-2 py-1 bg-slate-50 rounded-full text-black flex items-center justify-between">
            <div className="flex gap-4 items-center">
                {isCompleted ? (
                    <FaRegCheckCircle
                        onClick={toggleTask}
                        className="text-blue-500 cursor-pointer"
                    />
                ) : (
                    <FaRegCircle
                        onClick={toggleTask}
                        className="cursor-pointer"
                    />
                )}

                <p className={isCompleted ? "line-through text-gray-400" : ""}>
                    {content}
                </p>
                <div className="text-sm font-bold text-blue-800">
                    Difficulty:{" "}
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
                <div className="text-sm font-bold text-blue-400">
                    Importance:{" "}
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
                <div className="flex gap-2">
                    {days.map((day, index) => (
                        <label
                            key={index}
                            className={`rounded-full px-2 text-sm text-white ${
                                achievedDays.includes(day)
                                    ? "bg-blue-300 line-through"
                                    : "bg-blue-500"
                            }`}
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
                </div>
            </div>
            <FaRegTimesCircle
                className="hover:scale-110 transition-all duration-500 text-red-500"
                onClick={onDelete}
            />
        </div>
    );
}
