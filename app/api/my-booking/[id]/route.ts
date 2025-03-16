
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { Params } from "@/types/types";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection)

    const singleBooking = await bookingCollection.findOne({ _id: new ObjectId(id) })
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    const isOwnerOk = email === singleBooking?.email
    if (isOwnerOk) {
        return NextResponse.json(singleBooking)
    } else {
        return NextResponse.json({ message: 'forbidden' }, { status: 401 })
    }

}
export const PATCH = async (req: NextRequest, { params }: { params: Params }) => {
    const { id } = await params
    const body = await req.json()
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection)
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    const currentBooking = await bookingCollection.findOne({ _id: new ObjectId(id) })
    const isOwnerOk = email === currentBooking?.email

    if (isOwnerOk) {
        const filter = {
            $set: { ...body }
        }
        const option = {
            upsert: true
        }
        const updateResponse = await bookingCollection.updateOne({ _id: new ObjectId(id) }, filter, option)
        revalidatePath('/my-booking')
        return NextResponse.json(updateResponse)
    } else {
        return NextResponse.json({ message: 'forbidden' }, { status: 401 })
    }
}