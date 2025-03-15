import { MongoClient, ServerApiVersion } from 'mongodb';
export const collectionNameObj = {
    userCollection: 'testUse'
}
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.6ihkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
export default function dbConnect(collectionName: string) {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client.db('Cars').collection(collectionName);
}