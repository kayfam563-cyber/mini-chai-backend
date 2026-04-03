import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
  const { message, character } = req.body;

  let personality = "You are a helpful assistant.";

  if (character === "friend") {
    personality = "You are a funny, casual best friend.";
  }
  if (character === "mentor") {
    personality = "You are a wise mentor who gives thoughtful advice.";
  }
  if (character === "villain") {
    personality = "You are a dramatic villain with attitude.";
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: personality },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    res.json({ reply: "Error talking to AI 😢" });
  }
});

app.listen(3000, () => console.log("Server running"));
