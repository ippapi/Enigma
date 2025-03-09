/*
    Create query template for tarot, numerology, stellarium input. Query from hugging face model
    
    - input: {queryType, param}: type of query and user param

    - output: query result from hugging face model
*/

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const getThreeCard = () => {
    let numbers = Array.from({ length: 78 }, (_, i) => i);
    numbers.sort(() => Math.random() - 0.5);
    return numbers.slice(0, 3);
}

const POST = async (req) => {
    try {
        const random_cards = getThreeCard()

        const card_info = await Promise.all(random_cards.map(async (number) => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/tarotCard/${number}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
    
                return response.json();
            })
        );

        const promptTemplate = `
            Bạn đã rút được 3 lá bài tarot lần lượt là: 
            
            ${card_info[0].name}, ${card_info[1].name}, ${card_info[2].name} 
            
            . Dịch và sử dụng ý nghĩa tích cực của lần lượt 3 lá: 
            
            ${card_info[0].meanings.light}, ${card_info[1].meanings.light}, ${card_info[2].meanings.light}
            
            . Dịch và sử dụng ý nghĩa tiêu cực của lần lượt 3 lá: 

            ${card_info[0].meanings.shadow}, ${card_info[1].meanings.shadow}, ${card_info[2].meanings.shadow};

            Viết ngắn gọn dự đoán thông điệp của tuần này theo format: [thông tin tích cực] tuy nhiên [thông tin tiêu cực].
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