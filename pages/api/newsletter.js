import {
    MongoClient
} from "mongodb";

async function handler(req, res) {
    if (req.method = "POST") {
        const userEmail = req.body.email

        if (!userEmail || !userEmail.includes("@")) {
            res.status(422).json({
                message: "Invalid email address."
            })
            return;
        }

        const client = await MongoClient.connect("mongodb+srv://SapunovNikolay:mckZB8tipcm6MbJM@eventsapp.f0zhihq.mongodb.net/events?retryWrites=true&w=majority")

        const db = client.db()
        await db.collection("emails").insertOne({
            email: userEmail
        })

        client.close()

        console.log(userEmail);

        res.status(201).json({
            message: "Signed up!"
        })
    }
}

export default handler;