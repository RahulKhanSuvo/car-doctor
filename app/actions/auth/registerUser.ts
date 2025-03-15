"use server";
import { collectionNameObj } from './../../../lib/dbConnect';


import dbConnect from "@/lib/dbConnect"

interface Payload {
    name: string;
    email: string;
    password: string;
}
export const registerUser = async (payload: Payload) => {

    const userCollection = await dbConnect(collectionNameObj.userCollection);
    // check if the user already exists
    const existentUser = await userCollection.findOne({ email: payload.email });
    if (!existentUser) {
        const result = await userCollection.insertOne(payload);

        return {
            acknowledged: result.acknowledged,
            insertedId: result.insertedId.toString(),
        }

    }
    return { success: false, message: "User already exists!" };



}