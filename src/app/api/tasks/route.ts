import { NextResponse } from "next/server";
import prisma from '../../../../utils/prisma-client';

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const data = await request.json();
  const { name, description, status, dueDate, isRecurring, recursiveTime, isUrgent, userId } = data;

  const newTask = await prisma.task.create({
    data: {
      name,
      description,
      status,
      dueDate: new Date(dueDate),
      isRecurring,
      recursiveTime,
      isUrgent,
      userId,
    },
  });

  return NextResponse.json(newTask);
}