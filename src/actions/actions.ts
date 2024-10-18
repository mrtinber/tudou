"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {

    await prisma.todo.create({
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

    revalidatePath('/');
}

export async function getTodos(id: string) {
    return await prisma.todo.findMany({
        where: {userId: id}
    })
}

export async function deleteTodo(idToDelete: string) {
    await prisma.todo.delete({
        where: {id: idToDelete}
    });

    revalidatePath('/')
}