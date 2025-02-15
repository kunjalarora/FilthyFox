import { NextResponse } from "next/server";
import prisma from '../../../../utils/prisma-client';

// create a new user
export async function POST(request: Request){
    const data = await request.json();
    const { name, email, password, photo } = data;

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password,
            photo
        }
    })

    return NextResponse.json(newUser);
}