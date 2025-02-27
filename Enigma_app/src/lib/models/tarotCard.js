import mongoose from "mongoose";

const TarotCardSchema = new mongoose.Schema({
    card_index: {type: String, required: true},
    name: { type: String, required: true },
    number: { type: String, required: true },
    arcana: { type: String },
    suit: { type: String},
    img: { type: String},
    fortune_telling: { type: [String]},
    keywords: { type: [String]},
    meanings: {
        light: { type: [String]},
        shadow: { type: [String]}
    },
    Archetype: { type: String},
    "Hebrew Alphabet": { type: String},
    Numerology: { type: String},
    Elemental: { type: String},
    "Mythical/Spiritual": { type: String},
    "Questions to Ask": { type: [String]}
});

export default mongoose.models.TarotCard || mongoose.model("TarotCard", TarotCardSchema);
