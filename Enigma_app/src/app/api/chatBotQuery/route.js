/*
    Create query template for tarot, numerology, stellarium input. Query from hugging face model
    
    - input: {queryType, param}: type of query and user param

    - output: query result from hugging face model
*/

import { GoogleGenerativeAI } from "@google/generative-ai";

function drawTarotCards() {
    const tarotCards = [
        "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
        "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
        "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
        "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
        "Judgement", "The World",

        "Ace of Wands", "Two of Wands", "Three of Wands", "Four of Wands", "Five of Wands",
        "Six of Wands", "Seven of Wands", "Eight of Wands", "Nine of Wands", "Ten of Wands",
        "Page of Wands", "Knight of Wands", "Queen of Wands", "King of Wands",

        "Ace of Cups", "Two of Cups", "Three of Cups", "Four of Cups", "Five of Cups",
        "Six of Cups", "Seven of Cups", "Eight of Cups", "Nine of Cups", "Ten of Cups",
        "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups",

        "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords",
        "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords",
        "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords",

        "Ace of Pentacles", "Two of Pentacles", "Three of Pentacles", "Four of Pentacles", "Five of Pentacles",
        "Six of Pentacles", "Seven of Pentacles", "Eight of Pentacles", "Nine of Pentacles", "Ten of Pentacles",
        "Page of Pentacles", "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles"
    ];

    // Shuffle the deck
    tarotCards.sort(() => Math.random() - 0.5);

    // Draw three cards
    return tarotCards.slice(0, 3);
}

const POST = async (req) => {
    try {
        const { queryType, param } = await req.json();

        // Clear template
        let promptTemplate = "";
        // Create prompt template for each type
        if(queryType === "tarot"){
            const [first, second, third] = drawTarotCards();
            promptTemplate = `Với ba lá bài ${first}, ${second}, ${third} giải thích ngắn gọn ý nghĩa của ba lá bài để nói về mọi thứ sắp tới`;
        }else if(queryType === "numerology"){
            const [year, month, day] = param.split("-");
            promptTemplate = `Trả lời bằng tiếng việt, giải thích tổng quan số life path, số destiny, số soul urge, số personality, natural talent, personal year cá nhân của ngày sinh sau theo góc nhìn thần số học ngày ${day} tháng ${month} năm ${year}`;
        }else if(queryType === "stellarium"){
            const [year, month, day] = param.split("-");
            promptTemplate = `Trả lời bằng tiếng việt, bạn là một chuyên gia xem chiêm tinh học. Giải thích tổng quan ý nghĩa của ngày sinh: ngày ${day} tháng ${month} năm ${year}`;
        }else{
            return new Response(JSON.stringify({ message: "Invalid query type" }), {status: 400});
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Send request to Gemini
        const result = await model.generateContent(promptTemplate);
        const formattedText =  result.response.text().replace(/\*\*/g, "<br>");
        return new Response(JSON.stringify({ reply: formattedText || "No response" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }catch(error){
        return new Response(JSON.stringify({ message: "Error processing request ${error}" }), {status: 500});
    }
};

export { POST };