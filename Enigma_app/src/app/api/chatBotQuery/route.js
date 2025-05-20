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
        let {cardInfo, userMessage} = body;

        if (!userMessage.trim())
            userMessage = "Hãy cho tôi biết điều gì đang chờ đợi tôi trong thời gian tới.";

        const promptTemplate = `
            Bạn là một người xem tarot chuyên nghiệp, mát tay cũng như hiểu rõ ý nghĩa của các lá bài. Bạn đã rút được 3 lá bài tarot lần lượt là: 
            ${cardInfo[0].name}, ${cardInfo[1].name}, ${cardInfo[2].name} 
            . Dịch và sử dụng ý nghĩa tích cực của lần lượt 3 lá: 
            ${cardInfo[0].meanings.light}, ${cardInfo[1].meanings.light}, ${cardInfo[2].meanings.light}
            . Dịch và sử dụng ý nghĩa tiêu cực của lần lượt 3 lá: 
            ${cardInfo[0].meanings.shadow}, ${cardInfo[1].meanings.shadow}, ${cardInfo[2].meanings.shadow};
            Sử dụng khả năng ngôn ngữ phong phú, cô đọng cùng các thông tin từ các lá bài, trả lời cho thắc mắc của người dùng ${userMessage}, câu trả lời đi từ phân tích những điều thuận lợi tới những điều bất lợi cần lưu ý. Lưu ý: trả lời tự nhiên như người xem tarot thân thiện, tên các lá bài sử dụng bằng tiếng anh, còn các nội dung còn lại hoàn toàn bằng tiếng Việt, không thêm vào cụm từ "ý nghĩa tiêu cực" hay "ý nghĩa tích cực", không chêm vào các ký tự, dấu kết dòng, các từ tiếng anh đầu vào.
        `;
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Send request to Gemini
        const result = await model.generateContent(promptTemplate);
        return NextResponse.json({reply: result.response.text() || "No response"}, {status: 200});
    }catch(error){
        return new Response(JSON.stringify({ message: "Error processing request ${error}" }), {status: 500});
    }
};

export { POST };