import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

type Params = {
    params: {
        id: string;
    };
};
export const DELETE = async (req: NextResponse, { params }: Params) => {
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection)
    const { id } = await params
    // deleting user validation
    const session = await getServerSession(authOptions)

    const currentBooking = await bookingCollection.findOne({ _id: new ObjectId(id) })
    const isOwnerOk = currentBooking && session?.user?.email === currentBooking.email
    if (isOwnerOk) {
        const deleteResponse = await bookingCollection.deleteOne({ _id: new ObjectId(id) })
        return NextResponse.json(deleteResponse)
    } else {
        return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 401 })
    }

}
export const GET = async (req: NextResponse, { params }: Params) => {
    const { id } = await Promise.resolve(params);
    const serverCollection = dbConnect("carCollection");
    const data = await serverCollection.findOne({ _id: new ObjectId(id) });

    if (!data) {
        return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json(data);
};
