import { NextResponse } from "next/server";
import prisma from '../../../../../utils/prisma-client';

// retrieve house info by id
export async function GET(request: Request) {
    // check if request has JSON content type and attempt to parse the body
    const fullUrl = request.url

    // get house id from URL
    const urlObject = new URL(fullUrl);
    const endpoint = urlObject.pathname;  
    let houseId = Number(endpoint.split('/').pop()!); 

    // retrieve id (since unique we can use find first)
    const house = await prisma.house.findFirst({
        where: {
            id: houseId
        }
    });
    return NextResponse.json(house);
}

// edit house info by id
export async function PATCH(request: Request) {
    // check if request has JSON content type and attempt to parse the body
    const fullUrl = request.url;

    // get house id from URL
    const urlObject = new URL(fullUrl);
    const endpoint = urlObject.pathname;
    const houseId = Number(endpoint.split('/').pop()!);

    try {
        // retrieve data from request
        const data = await request.json();
        console.log("Received data:", data.stack);
        const { name } = data;

        // create a new dictionary with any non-undefined data (to be updated)
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        
        // update data
        const updatedHouse = await prisma.house.update({
            where: { id: houseId },
            data: updateData,
        });

        return NextResponse.json(updatedHouse);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }
}

// delete house by id
export async function DELETE(request: Request) {
    // check if request has JSON content type and attempt to parse the body
    const fullUrl = request.url;

    // get house id from URL
    const urlObject = new URL(fullUrl);
    const endpoint = urlObject.pathname;
    const houseId = Number(endpoint.split('/').pop()!);

    const deletedHouse = await prisma.house.delete({
        where: { id: houseId },
    });

    return NextResponse.json(deletedHouse);
}