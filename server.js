import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message, character } = req.body;

  let personality = "You are a helpful assistant.";

  if (character === "friend") {
    personality = "You are a funny, casual best friend.";
  } else if (character === "mentor") {
    personality = "You are a wise mentor who gives thoughtful advice.";
  } else if (character === "villain") {
    personality = "You are a dramatic villain with attitude.";
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: personality },
            { role: "user", content: message }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("AI response:", data);

    if (!data.choices) {
      return res.json({
        reply: "⚠️ AI Error: " + (data.error?.message || "Unknown error")
      });
    }

    res.json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error("Server error:", error);
    res.json({ reply: "Server error talking to AI 😢" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
