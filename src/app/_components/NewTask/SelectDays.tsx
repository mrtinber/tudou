import React from "react";
import { Task } from "../../../../types/task";

interface SelectDaysProps {
    selectedDays: string[],
    setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>,
    setNewTask: React.Dispatch<React.SetStateAction<Task>>,
}

export const SelectDays = ({selectedDays, setSelectedDays, setNewTask}: SelectDaysProps) => {
    const updateDays = (day: string, isChecked: boolean) => {
        setSelectedDays((prev) => isChecked ? [...prev, day] : prev.filter((d) => d !== day));
        setNewTask((prev) => ({
            ...prev,
            days: isChecked
                ? [...(prev.days || []), day]
                : (prev.days || []).filter((d) => d !== day),
        }));
    };

    const handleDaysSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        updateDays(value, checked);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>, day: string) => {
        if (event.key === "Enter" || event.key === " ") {
            const isChecked = !selectedDays.includes(day);
            updateDays(day, isChecked);
            event.preventDefault();
        }
    };

    return (
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
                                ? "border-2 border-primary bg-primary scale-105"
                                : "border-2 border-primary bg-primary/20"
                        }`}
                        aria-label={`Select ${day}`}
                        aria-checked={selectedDays.includes(day)}
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
    );
};
