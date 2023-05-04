import { MongoClient } from "mongodb";

async function handler(req, res) {
    const { eventId } = req.query;

    const client = await MongoClient.connect("mongodb+srv://SapunovNikolay:mckZB8tipcm6MbJM@eventsapp.f0zhihq.mongodb.net/events?retryWrites=true&w=majority")

    if(req.method === "GET") {
        const db = client.db();

        const documents = await db.collection("comments")
        .find()
        .sort({_id: -1}).toArray()

        console.log(documents)

        res.status(200).json({
            comments: documents
        })
    }

    if(req.method === "POST") {
        const {email, name, text} = req.body;

        if(!email.includes("@") || 
        !name || 
        !name.trim() === "" || 
        !text || 
        text.trim() === "") {
            res.status(422).json({
                message: "Invalid input."
            })
            return;
        }

        console.log(email, name, text);

        const newComment = {
            email,
            name,
            text,
            eventId
        }

        const db = client.db()
        const result = await db.collection("comments").insertOne(newComment)
            
        console.log(result)

        newComment.id = result.insertedId

        res.status(200).json({
            message: `Successfully added a new comment by ${name}`,
            comment: newComment
        })
    }

    client.close()
}       

export default handler;