/* 
    Define POST method to init or change the card info

    - POST: create card info using a json file
        + input: {filePath}: path to the card json file
        + output: write the card info to the database
*/

import fs from "fs";
import path from "path";
import dbConnect from "@/lib/dbConnect";
import TarotCard from "@/lib/models/tarotCard";
import { NextResponse } from "next/server";

const POST = async () => {
    await dbConnect();

    try{
        const filePath = path.join(process.cwd(), "public","tarot_cards", "tarot-images.json");

        if (!fs.existsSync(filePath)) {
            console.error("Error: tarot-images.json file not found!");
            return NextResponse.json({ error: filePath }, { status: 500 });
        }

        const fileContent = fs.readFileSync(filePath, "utf8").trim();

        if (!fileContent) {
            console.error("Error: tarot-images.json file is empty!");
            return NextResponse.json({ error: "JSON file is empty" }, { status: 500 });
        }

        let cards;
        try {
            cards = JSON.parse(fileContent);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return NextResponse.json({ error: "Invalid JSON format" }, { status: 500 });
        }

        const getImageBase64 = (card) => {
            const imgPath = path.join(process.cwd(), "public","tarot_cards", card.img);
            let imageBase64 = "";
            if(fs.existsSync(imgPath)){
                const imageBuffer = fs.readFileSync(imgPath);
                imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
            }

            return {
                ...card,
                img: imageBase64,
            };
        };

        cards = cards.map((card, index) => {
            return {
                ...getImageBase64(card),
                card_index: index,
            }
        });

        await TarotCard.insertMany(cards);
        return NextResponse.json({message: "Successfully inserted hahaha!"});
    }catch(error){
        return NextResponse.json({error: error}, {status: 500});
    }
};

export { POST };