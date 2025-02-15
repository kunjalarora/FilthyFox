import { NextResponse } from "next/server";
import prisma from '../../../../utils/prisma-client';

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}