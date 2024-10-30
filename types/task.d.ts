export interface Task {
    id?: string;
    content: string;
    importanceLevel: number;
    difficultyLevel: number;
    days: string[];
    isAchieved: boolean;
    userId?: string;
}