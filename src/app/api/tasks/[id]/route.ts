import { NextResponse } from "next/server";
import prisma from '../../../../../utils/prisma-client';

export async function POST(request: Request) {
    // check if request has JSON content type and attempt to parse the body
    const fullUrl = request.url

    // get task id from URL
    const urlObject = new URL(fullUrl);
    const endpoint = urlObject.pathname;  
    let taskId = Number(endpoint.split('/').pop()!); 

    const task = await prisma.task.findFirst({
        where: {
            id: taskId
        }
    });
    return NextResponse.json(task);
}