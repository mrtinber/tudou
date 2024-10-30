import React, { useState } from "react";
import { Task } from "./NewTask";
import { FaArrowDownShortWide, FaArrowDownWideShort } from "react-icons/fa6";

type FilterBarProps = {
    tasks: Task[];
    setFilteredList: (tasks: Task[]) => void;
};

export const SortingBar = ({ tasks, setFilteredList }: FilterBarProps) => {
    const [sortState, setSortState] = useState<
        | "default"
        | "importanceAsc"
        | "importanceDesc"
        | "difficultyAsc"
        | "difficultyDesc"
    >("default");

    const handleImportanceSort = () => {
        let sortedTasks: Task[];

        if (sortState === "importanceDesc") {
            sortedTasks = [...tasks].sort(
                (a, b) => a.importanceLevel - b.importanceLevel
            );
            setSortState("importanceAsc");
        } else if (sortState === "importanceAsc") {
            sortedTasks = [...tasks];
            setSortState("default");
        } else {
            sortedTasks = [...tasks].sort(
                (a, b) => b.importanceLevel - a.importanceLevel
            );
            setSortState("importanceDesc");
        }

        setFilteredList(sortedTasks);
    };

    const handleDifficultySort = () => {
        let sortedTasks: Task[];

        if (sortState === "difficultyDesc") {
            sortedTasks = [...tasks].sort(
                (a, b) => a.difficultyLevel - b.difficultyLevel
            );
            setSortState("difficultyAsc");
        } else if (sortState === "difficultyAsc") {
            sortedTasks = [...tasks];
            setSortState("default");
        } else {
            sortedTasks = [...tasks].sort(
                (a, b) => b.difficultyLevel - a.difficultyLevel
            );
            setSortState("difficultyDesc");
        }

        setFilteredList(sortedTasks);
    };

    return (
        <div className="flex gap-4 items-center pb-2 lg:mx-8 text-sm border-b-2 border-secondary">
            <div className="font-bold">Sort by:</div>
            <div className="flex gap-4">
                <button
                    onClick={handleImportanceSort}
                    className="flex gap-2 items-center hover:text-secondary-foreground transition-colors duration-300"
                >
                    Importance
                    {sortState === "importanceAsc" ? (
                        <FaArrowDownShortWide />
                    ) : sortState === "importanceDesc" ? (
                        <FaArrowDownWideShort />
                    ) : null}
                </button>
                <button
                    onClick={handleDifficultySort}
                    className="flex gap-2 items-center hover:text-secondary-foreground transition-colors duration-300"
                >
                    Difficulty
                    {sortState === "difficultyAsc" ? (
                        <FaArrowDownShortWide />
                    ) : sortState === "difficultyDesc" ? (
                        <FaArrowDownWideShort />
                    ) : null}
                </button>
            </div>
        </div>
    );
};
