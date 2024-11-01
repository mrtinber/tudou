import React from "react";
import { FaMicrophone } from "react-icons/fa6";
import { Task } from "../../../../types/task";

interface RecordButtonProps {
    setNewTask: React.Dispatch<React.SetStateAction<Task>>;
}

export const RecordButton: React.FC<RecordButtonProps> = ({ setNewTask }) => {
    const handleRecord = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onresult = async function (event) {
            let transcript = event.results[0][0].transcript;
            transcript =
                transcript.charAt(0).toUpperCase() + transcript.slice(1);

            setNewTask((prev) => ({ ...prev, content: transcript }));
        };

        recognition.start();
    };

    return (
        <button
            type="button"
            onClick={handleRecord}
            aria-label="Start recording"
            className="bg-primary text-primary-foreground disabled:bg-secondary hover:bg-destructive hover:text-destructive-foreground hover:scale-105 focus:ring-4 focus:ring-primary/50 rounded-full px-2 transition-all duration-300"
        >
            <FaMicrophone />
        </button>
    );
};
