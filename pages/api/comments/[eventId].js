import { connectDatabase, insertDocument, getAllDocuments } from "../../../utils/db-utils";

async function handler(req, res) {
    const { eventId } = req.query;

    let client;

    try {
        client = await connectDatabase()
    } catch (error) {
        res.status(500).json({
            message: "Connecting to the database failed."
        })
        return;
    }

    if (req.method === "GET") {
        let documents
        try {
            documents = await getAllDocuments(client, "comments", { _id: -1 })

        } catch (error) {
            res.status(500).json({
                message: "Getting comments failed."
            })
        }

        res.status(200).json({
            comments: documents
        })
    }

    if (req.method === "POST") {
        const { email, name, text } = req.body;

        if (!email.includes("@") ||
            !name ||
            !name.trim() === "" ||
            !text ||
            text.trim() === "") {
            res.status(422).json({
                message: "Invalid input."
            })
            client.close()
            return;
        }

        console.log(email, name, text);

        const newComment = {
            email,
            name,
            text,
            eventId
        }

        let result

        try {
            result = await insertDocument(client, "comments", newComment)

            newComment._id = result.insertedId

            res.status(200).json({
                message: `Successfully added a new comment by ${name}`,
                comment: newComment
            })
        } catch (error) {
            res.status(500).json({
                message: "Inserting comment failed."
            })
        }
    }

    client.close()
}

export default handler;