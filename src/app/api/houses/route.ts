import { NextResponse } from "next/server";
import prisma from '../../../../utils/prisma-client';

// create a new house
export async function POST(request: Request){
    const data = await request.json();
    const { name } = data;

    const newHouse = await prisma.house.create({
        data: {
            name
        }
    })

    return NextResponse.json(newHouse);
}