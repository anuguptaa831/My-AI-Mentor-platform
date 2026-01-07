const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Google Gemini AI Connection
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


        const result = await model.generateContent(message);
        const response = await result.response;
        const text =  response.text();
        console.log("AI Response:",text);
        res.json({ reply: text });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "AI is not Responding." });
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));