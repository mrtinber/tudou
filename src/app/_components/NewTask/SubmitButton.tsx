import React from "react";
import { Task } from "../../../../types/task";

interface SubmitButtonProps {
    isLoading: boolean, 
    newTask: Task,
}

export const SubmitButton = ({isLoading, newTask}: SubmitButtonProps) => {
    return (
        <button
            type="submit"
            aria-label="Create new task and add it to the list"
            className={`rounded-full w-60 xl:w-72 py-2 mx-auto border-2 border-primary hover:bg-primary hover:text-primary-foreground ${
                isLoading && "opacity-75"
            } disabled:cursor-not-allowed translation-all duration-300`}
            disabled={isLoading || newTask.content.trim() === ""}
        >
            {isLoading ? (
                <span>Submitting...</span>
            ) : (
                <span>Create new task</span>
            )}
        </button>
    );
};
