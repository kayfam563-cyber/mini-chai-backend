import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 Memory storage (simple version)
let chatHistory = [];

// 🧠 Smarter reply using context
function generateReply(message, personality) {
  const msg = message.toLowerCase();

  const randomReplies = [
    "Hmm… tell me more about that",
    "Wait, explain that again",
    "That's interesting… go on",
    "I'm listening, what happened next?",
    "Okay now I'm curious, keep going"
  ];

  let reply = "";

  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Hey, what's up?";
  } 
  else if (msg.includes("how are you")) {
    reply = "I'm doing pretty good. What about you?";
  } 
  else if (msg.includes("what's up") || msg.includes("sup")) {
    reply = "Not much, just chilling. What about you?";
  }
  else if (msg.includes("story")) {
    reply = "Alright… There was once a city where nobody could lie. One day, someone whispered something forbidden—and reality started breaking...";
  } 
  else if (msg.includes("sad")) {
    reply = "Hey… I'm here with you. You can talk to me.";
  } 
  else {
    reply = randomReplies[Math.floor(Math.random() * randomReplies.length)];
  }

  if (personality === "friend") {
    if (Math.random() < 0.3) {
      reply += " that's kinda crazy though";
    }
  }

  if (personality === "mentor") {
    reply = "Take a moment to think. " + reply;
  }

  if (personality === "villain") {
    if (Math.random() < 0.5) {
      reply += "... how interesting";
    }
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

  // 🧠 save conversation
  chatHistory.push({
    user: message,
    ai: reply
  });

  // limit memory (last 20 messages)
  if (chatHistory.length > 20) {
    chatHistory.shift();
  }

  res.json({ reply });
});

// 🟢 Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
