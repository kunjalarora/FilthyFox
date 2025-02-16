import { NextResponse } from "next/server";
import prisma from '../../../../../../utils/prisma-client';

// retrieve house members by id
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

    // make sure house is not null
    if (!house) {
        return NextResponse.json({ error: "House not found" }, { status: 404 });
    }

    // retrieve members
    const members = await prisma.user.findMany({
        where: {
            houseId: house.id
        }
    });

    return NextResponse.json(members);
}
