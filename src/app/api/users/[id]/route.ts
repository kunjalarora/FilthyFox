import { NextResponse } from "next/server";
import prisma from '../../../../../utils/prisma-client';

// retrieve user info by id
export async function GET(request: Request) {
    // check if request has JSON content type and attempt to parse the body
    const fullUrl = request.url

    // get user id from URL
    const urlObject = new URL(fullUrl);
    const endpoint = urlObject.pathname;  
    let userId = Number(endpoint.split('/').pop()!); 

    // retrieve id (since unique we can use find first)
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });
    return NextResponse.json(user);
}


// edit user info by id
export async function PATCH(request: Request) {
    // check if request has JSON content type and attempt to parse the body
    const fullUrl = request.url;

    // get user id from URL
    const urlObject = new URL(fullUrl);
    const endpoint = urlObject.pathname;
    const userId = Number(endpoint.split('/').pop()!);

    try {
        // retrieve data from request
        const data = await request.json();
        console.log("Received data:", data);
        const { name, email, password, photo, houseId } = data;

        // create a new dictionary with any non-undefined data (to be updated)
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (password !== undefined) updateData.password = password;
        if (photo !== undefined) updateData.photo = new Date(photo);
        if (houseId !== undefined) updateData.houseId = houseId;

        // update data
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }
}

// delete user by id
export async function DELETE(request: Request) {
    // check if request has JSON content type and attempt to parse the body
    const fullUrl = request.url;

    // get task id from URL
    const urlObject = new URL(fullUrl);
    const endpoint = urlObject.pathname;
    const userId = Number(endpoint.split('/').pop()!);

    const deletedUser = await prisma.user.delete({
        where: { id: userId },
    });

    return NextResponse.json(deletedUser);
}