import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function generateReply(message, personality) {
  const msg = message.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) {
    return "Heyyy 😄 what's up?";
  }

  if (msg.includes("how are you")) {
    return "I'm doing pretty good honestly 😌 what about you?";
  }

  if (msg.includes("story")) {
    return "Alright listen… 🌌\n\nThere was once a city where nobody could lie. One day, a girl whispered a secret—and suddenly, the entire world started glitching...";
  }

  if (msg.includes("sad")) {
    return "Hey… it's okay to feel like that sometimes 💛 I'm here with you.";
  }

  // personality flavor
  if (personality.includes("villain")) {
    return "Interesting... your words amuse me 😈 but continue.";
  }

  if (personality.includes("mentor")) {
    return "Think deeply about that. The answer is already within you.";
  }

  if (personality.includes("friend")) {
    return "LOL wait that's actually crazy 😂 tell me more";
  }

  return "Hmm… tell me more about that 🤔";
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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
