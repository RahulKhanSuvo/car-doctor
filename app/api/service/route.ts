import { authOptions } from './../auth/[...nextauth]/route';
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"

export const GET = async (req: NextResponse) => {
    const session = await getServerSession(authOptions)

    if (session) {
        const email = session.user?.email
        const bookingCollection = dbConnect(collectionNameObj.bookingCollection)
        const result = await bookingCollection.find({ email }).toArray()
        return NextResponse.json(result)
    }
    console.log(session);
    return NextResponse.json({})
}
export const POST = async (req: NextResponse) => {
    const body = await req.json();
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection)
    const result = await bookingCollection.insertOne(body)
    console.log(body);
    return NextResponse.json(result)
}