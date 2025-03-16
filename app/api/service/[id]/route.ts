import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

type Params = {
    params: {
        id: string;
    };
};

export const GET = async (req: NextResponse, { params }: Params) => {
    const { id } = await Promise.resolve(params);
    const serverCollection = await dbConnect("carCollection");
    const data = await serverCollection.findOne({ _id: new ObjectId(id) });

    if (!data) {
        return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json(data);
};
