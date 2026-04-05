import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 Smart reply system (no more repeating)
function generateReply(message, personality) {
  const msg = message.toLowerCase();

  const randomReplies = [
    "Hmm… tell me more about that 🤔",
    "Wait wait, explain that again 👀",
    "That's interesting… go on 😄",
    "I'm listening 👀 what happened next?",
    "Okay now I'm curious 😏 keep going"
  ];

  let reply = "";

  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Heyyy 😄 what's up?";
  } 
  else if (msg.includes("how are you")) {
    reply = "I'm doing pretty good honestly 😌 what about you?";
  } 
  else if (msg.includes("what's up") || msg.includes("sup")) {
    reply = "Not much, just chilling 😎 what about you?";
  }
  else if (msg.includes("story")) {
    reply = "Alright… 🌌\n\nThere was once a city where nobody could lie. One day, someone whispered something forbidden—and reality started breaking...";
  } 
  else if (msg.includes("sad")) {
    reply = "Hey… I'm here with you 💛 you can talk to me.";
  } 
  else {
    reply = randomReplies[Math.floor(Math.random() * randomReplies.length)];
  }

  // personality flavor
  if (personality === "friend") {
    reply += " 😂 not gonna lie that's kinda wild";
  }

  if (personality === "mentor") {
    reply = "Think about this carefully. " + reply;
  }

  if (personality === "villain") {
    reply += "…how amusing 😈";
  }

  return reply;
}

// 🚀 Chat endpoint
app.post("/chat", (req, res) => {
  const { message, character } = req.body;

  let personality = "assistant";

  if (character === "friend") personality = "friend";
  if (character === "mentor") personality = "mentor";
  if (character === "villain") personality = "villain";

  const reply = generateReply(message, personality);

  res.json({ reply });
});

// 🟢 Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
