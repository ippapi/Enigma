/*
    Create query template for tarot, numerology, stellarium input. Query from hugging face model
    
    - input: {queryType, param}: type of query and user param

    - output: query result from hugging face model
*/

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const POST = async (req) => {
    try {
        const body = await req.json();
        const {cardInfo} = body;

        const promptTemplate = `
            Bạn đã rút được 3 lá bài tarot lần lượt là: 
            
            ${cardInfo[0].name}, ${cardInfo[1].name}, ${cardInfo[2].name} 
            
            . Dịch và sử dụng ý nghĩa tích cực của lần lượt 3 lá: 
            
            ${cardInfo[0].meanings.light}, ${cardInfo[1].meanings.light}, ${cardInfo[2].meanings.light}
            
            . Dịch và sử dụng ý nghĩa tiêu cực của lần lượt 3 lá: 

            ${cardInfo[0].meanings.shadow}, ${cardInfo[1].meanings.shadow}, ${cardInfo[2].meanings.shadow};

            Viết ngắn gọn dự đoán thông điệp của ngày hôm nay theo format: [thông tin tích cực] tuy nhiên [thông tin tiêu cực].
        `;
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Send request to Gemini
        const result = await model.generateContent(promptTemplate);
        const formattedText =  result.response.text().replace(/\*\*/g, "<br>");
        return NextResponse.json({reply: formattedText || "No response"}, {status: 200});
    }catch(error){
        return new Response(JSON.stringify({ message: "Error processing request ${error}" }), {status: 500});
    }
};

export { POST };