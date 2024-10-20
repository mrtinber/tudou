"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
    const newTask = await prisma.todo.create({
        data: {
            content: formData.get("content") as string,
            difficultyLevel: Number(formData.get("difficultyLevel")),
            importanceLevel: Number(formData.get("importanceLevel")),
            days: formData.getAll("daysSelect") as string[], // Assurez-vous que 'daysSelect' correspond au nom du champ dans votre formulaire
            isAchieved: formData.get("isAchieved") === "true" ? true : false,
            user: {
                connect: {
                    id: formData.get("user") as string,
                },
            },
        },
    });

    revalidatePath("/", "page");

    return newTask;
}

export async function getTodos(id: string) {
    return await prisma.todo.findMany({
        where: { userId: id },
    });
}

export async function deleteTodo(idToDelete: string) {
    await prisma.todo.delete({
        where: { id: idToDelete },
    });

    revalidatePath("/", "page");
}

export async function handleAchievement(idToToggle: string, isAchievedFromUI: boolean) {
    const todo = await prisma.todo.findUnique({
        where: { id: idToToggle },
    });

    if (!todo) {
        throw new Error("Todo not found.");
    }

    await prisma.todo.update({
        where: { id: idToToggle },
        data: {
            isAchieved: isAchievedFromUI,
        },
    });

    revalidatePath("/", "page");
}
