/* 
    Define GET, POST method to get card info or change the card info

    - GET: Using number to query for card info
        + input: {number}: card's id
        + output: card info

    - POST: create card info using a json file
        + input: {filePath}: path to the card json file
        + output: write the card info to the database
*/

import dbConnect from "@/lib/dbConnect";
import TarotCard from "@/lib/models/tarotCard";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const GET = async (req) => {
    await dbConnect();

    try{
        const { number } = req.json();

        if(!Number.isInteger(Number(value)))
            return NextResponse.json({message: "Number is not valid"}, {status: 401});

        const card = await TarotCard.findOne({number: number});
        return NextResponse.json(card);
    }catch(error){
        return NextResponse.json({error: error}, {status: 500});
    }
};

const POST = async () => {
    await dbConnect();

    try{
        // ✅ Correctly locate the JSON file
        const filePath = path.join(process.cwd(), "public","tarot_cards", "tarot-images.json");

        // ✅ Check if the file exists
        if (!fs.existsSync(filePath)) {
            console.error("Error: tarot-images.json file not found!");
            return NextResponse.json({ error: filePath }, { status: 500 });
        }

        // ✅ Read the file content
        const fileContent = fs.readFileSync(filePath, "utf8").trim();

        // ✅ Check if the file is empty
        if (!fileContent) {
            console.error("Error: tarot-images.json file is empty!");
            return NextResponse.json({ error: "JSON file is empty" }, { status: 500 });
        }

        // ✅ Parse the JSON data
        let cards;
        try {
            cards = JSON.parse(fileContent);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return NextResponse.json({ error: "Invalid JSON format" }, { status: 500 });
        }

        console.log("Loaded Cards from JSON:", cards); // ✅ Debugging log

        const getImageBase64 = (card) => {
            const imgPath = path.join(process.cwd(), "public","tarot_cards", card.img);
            let imageBase64 = "";
            if(fs.existsSync(imgPath)){
                const imageBuffer = fs.readFileSync(imgPath);
                imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
            }

            return {
                ...card,
                img: imageBase64
            };
        };

        cards = cards.map(card => getImageBase64(card));

        const count = await TarotCard.countDocuments();
        if(count === 0){
            await TarotCard.insertMany(cards);
            return NextResponse.json({message: "Successfully inserted hahaha!"});
        }
    }catch(error){
        return NextResponse.json({error: error}, {status: 500});
    }
};

export { GET, POST };
