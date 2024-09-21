"use client";

import { useState } from "react";
import {
    FaRegCheckCircle,
    FaRegCircle,
    FaRegTimesCircle,
} from "react-icons/fa";

type Props = {
    content: string,
    onDelete: () => void,
};

export default function Task({ content, onDelete }: Props) {
    const [isCompleted, setIsCompleted] = useState(false);

    const toggleTask = () => {
        setIsCompleted(!isCompleted);
    };

    return (
        <div className="px-2 py-1 bg-slate-50 rounded-full text-black flex items-center justify-between">
            <div className="flex gap-4 items-center">
                {isCompleted ? (
                    <FaRegCheckCircle
                        onClick={toggleTask}
                        className="text-green-500 cursor-pointer"
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
            </div>
            <FaRegTimesCircle
                className="hover:scale-110 transition-all duration-500 text-red-500"
                onClick={onDelete}
            />
        </div>
    );
}
