import { NextResponse } from "next/server";
import prisma from '../../../../utils/prisma-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  // find tasks with userId idf provided or all by filtering {}
  const tasks = await prisma.task.findMany({
    where: userId ? { userId: parseInt(userId, 10) } : {},
    orderBy: {
      dueDate: 'desc'
    }
  });

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