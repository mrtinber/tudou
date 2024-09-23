"use client";

import { useEffect, useState } from "react";
import {
    FaRegCheckCircle,
    FaRegCircle,
    FaRegTimesCircle,
} from "react-icons/fa";

type Props = {
    content: string;
    importanceLevel: number;
    difficultyLevel: number;
    days: string[];
    onDelete: () => void;
};

export default function TaskElement({
    content,
    importanceLevel,
    difficultyLevel,
    days,
    onDelete,
}: Props) {
    const [isCompleted, setIsCompleted] = useState(false);
    const [achievedDays, setAchievedDays] = useState<string[]>([]);

    const toggleTask = () => {
        setIsCompleted(!isCompleted);
    };

    const handleAchievement = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setAchievedDays((prev) =>
            checked ? [...prev, value] : prev.filter((day) => day !== value)
        );
    };

    useEffect(() => {
        if (days.every((day) => achievedDays.includes(day))) {
            setIsCompleted(true);
            console.log("tous les jours sont faits");
        } else {
            setIsCompleted(false);
        }
    }, [achievedDays]);

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
                    Difficulty: {difficultyLevel}
                </div>
                <div className="text-sm font-bold text-blue-400">
                    Importance: {importanceLevel}
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
