import React from "react";
import { Task } from "../../../../types/task";

export const ProgressBar = ({tasks}: {tasks: Task[]}) => {
    const achievedPercentage =
        (tasks.filter((task) => task.isAchieved).length * 100) / tasks.length;

    return (
        <div className="flex gap-2 items-center">
            <div className="w-full relative">
                <div className="w-full h-2 bg-secondary rounded-full absolute" />
                <div
                    className="h-2 bg-primary rounded-full absolute transition-all duration-500"
                    style={{ width: `${achievedPercentage}%` }}
                    aria-label={`You have achieved ${achievedPercentage}% of your tasks.`}
                    aria-live="polite"
                    role="progressbar"
                    aria-valuenow={achievedPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
            <p aria-live="polite">{achievedPercentage.toFixed(0)}%</p>
        </div>
    );
};
