/* 
    Define GET method to get card info

    - GET: Using number to query for card info
        + input: {number}: card's id
        + output: card info
*/

import dbConnect from "@/lib/dbConnect";
import TarotCard from "@/lib/models/tarotCard";
import { NextResponse } from "next/server";

const GET = async (req, {params}) => {
    await dbConnect();

    try{
        const card_index = (await params).number;
        if(!Number.isInteger(Number(card_index)))
            return NextResponse.json({message: "Number is not valid"}, {status: 401});

        const card = await TarotCard.findOne({card_index: card_index});
        return NextResponse.json(card);
    }catch(error){
        return NextResponse.json({error: error}, {status: 500});
    }
};

export { GET };
