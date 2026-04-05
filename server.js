import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function generateReply(message, personality) {
  const msg = message.toLowerCase();

  let reply = "";

  // smarter base responses
  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Heyyy 😄 what's up?";
  } else if (msg.includes("how are you")) {
    reply = "I'm doing pretty good honestly 😌 what about you?";
  } else if (msg.includes("story")) {
    reply = "Alright listen… 🌌\n\nThere was once a city where nobody could lie. One day, a girl whispered a secret—and suddenly, the entire world started glitching...";
  } else if (msg.includes("sad")) {
    reply = "Hey… it's okay to feel like that sometimes 💛 I'm here with you.";
  } else {
    reply = "Hmm… tell me more about that 🤔";
  }

  // personality layer (makes it feel real)
  if (personality === "friend") {
    reply += " 😂 not gonna lie that's kinda wild";
  }

  if (personality === "mentor") {
    reply = "Take a moment to reflect. " + reply;
  }

  if (personality === "villain") {
    reply += "…how intriguing 😈";
  }

  return reply;
}

app.post("/chat", (req, res) => {
  const { message, character } = req.body;

  let personality = "assistant";

  if (character === "friend") personality = "friend";
  if (character === "mentor") personality = "mentor";
  if (character === "villain") personality = "villain";

  const reply = generateReply(message, personality);

  res.json({ reply });
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
