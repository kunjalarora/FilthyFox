import { NextResponse } from "next/server";
import prisma from '../../../../../utils/prisma-client';

// retrieve user info by email
export async function GET(request: Request) {
    // retrieve serarch params
    const { searchParams } = new URL(request.url);
    const email = String(searchParams.get("email"));
    const password = String(searchParams.get("password"));

    if (email === null || password === null){
        return NextResponse.json({ error: "Email and password must be provided" }, { status: 400 });
    }
    
    // retrieve user (since unique we can use find first)
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });

    // return errors with user not existing and incorrect password error
    if (user === null){
        return NextResponse.json({ error: "No user with that email exists" }, { status: 400 });
    } else if (user.password !== password){
        return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    return NextResponse.json(user);
}