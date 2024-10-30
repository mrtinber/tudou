import { Slider } from "@/components/ui/slider";
import React from "react";

interface SliderInputProps {
    label: string;
    value: number;
    onValueChange: (value: number) => void;
    ariaLabel: string;
}

export const SliderInput = ({
    label,
    value,
    onValueChange,
    ariaLabel,
}: SliderInputProps) => {
    return (
        <div>
            <label htmlFor={ariaLabel}>{label}</label>
            <br />
            <div className="flex gap-2">
                <span>Low</span>
                <Slider
                    id={ariaLabel}
                    min={1}
                    max={5}
                    step={1}
                    value={[value]}
                    onValueChange={(newValue) => onValueChange(newValue[0])}
                    className="cursor-pointer custom-range"
                    aria-valuenow={value}
                    aria-valuemin={1}
                    aria-valuemax={5}
                    aria-label={ariaLabel}
                />
                <span>High</span>
            </div>
        </div>
    );
};
