import { NextResponse } from "next/server";
import prisma from '../../../../../utils/prisma-client';

export async function GET() {
    // return onlhy those with isUrgent=true
    const tasks = await prisma.task.findMany({
        where: {
        isUrgent: true,
        },
    });
    return NextResponse.json(tasks);
}
