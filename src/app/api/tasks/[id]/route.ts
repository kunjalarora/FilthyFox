import { NextResponse } from "next/server";
import prisma from '../../../../../utils/prisma-client';

// retrieve task info by id
export async function GET(request: Request) {
    // check if request has JSON content type and attempt to parse the body
    const fullUrl = request.url

    // get task id from URL
    const urlObject = new URL(fullUrl);
    const endpoint = urlObject.pathname;  
    let taskId = Number(endpoint.split('/').pop()!); 

    // retrieve id (since unique we can use find first)
    const task = await prisma.task.findFirst({
        where: {
            id: taskId
        }
    });
    return NextResponse.json(task);
}

// edit task info by id
export async function PATCH(request: Request) {
    // check if request has JSON content type and attempt to parse the body
    const fullUrl = request.url;

    // get task id from URL
    const urlObject = new URL(fullUrl);
    const endpoint = urlObject.pathname;
    const taskId = Number(endpoint.split('/').pop()!);

    try {
        // retrieve data from request
        const data = await request.json();
        console.log("Received data:", data.stack);
        const { name, description, status, dueDate, isRecurring, recursiveTime, isUrgent, userId } = data;

        // create a new dictionary with any non-undefined data (to be updated)
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (status !== undefined) updateData.status = status;
        if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
        if (isRecurring !== undefined) updateData.isRecurring = isRecurring;
        if (recursiveTime !== undefined) updateData.recursiveTime = recursiveTime;
        if (isUrgent !== undefined) updateData.isUrgent = isUrgent;
        if (userId !== undefined) updateData.userId = userId;

        // update data
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: updateData,
        });

        return NextResponse.json(updatedTask);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }
}

// delete task by id
export async function DELETE(request: Request) {
    // check if request has JSON content type and attempt to parse the body
    const fullUrl = request.url;

    // get task id from URL
    const urlObject = new URL(fullUrl);
    const endpoint = urlObject.pathname;
    const taskId = Number(endpoint.split('/').pop()!);

    const deletedTask = await prisma.task.delete({
        where: { id: taskId },
    });

    return NextResponse.json(deletedTask);
}