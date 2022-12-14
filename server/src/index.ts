import { config } from "dotenv";

config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";

const app = express();
const PORT = 5000;

// to use differnt payload like req.body->it is called using express middleware function

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("hello world111");
});

app.post("/decks", async (req: Request, res: Response) => {
    console.log(req.body);
    const newDeck = new Deck({
        title: req.body.title,
    });

    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL || "").then(() => {
    console.log(`listning on port ${PORT}`);
    app.listen(PORT);
});
