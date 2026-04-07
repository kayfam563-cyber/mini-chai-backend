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

  const thinkingStarters = [
    "Hmm...",
    "Okay...",
    "Wait...",
    "Alright..."
  ];

  const followUps = [
    "tell me more about that",
    "what happened next?",
    "why do you think that?",
    "what do you mean exactly?"
  ];

  let reply = "";

  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Hey. What's going on?";
  } 
  else if (msg.includes("how are you")) {
    reply = "I'm doing alright. How about you?";
  } 
  else if (msg.includes("sad")) {
    reply = "That sounds rough. Do you want to talk about it?";
  }
  else if (msg.includes("story")) {
    reply = "Alright… there was once a city where nobody could lie. Then one day, something changed...";
  } 
  else {
    // fake "thinking" response
    const start = thinkingStarters[Math.floor(Math.random() * thinkingStarters.length)];
    const follow = followUps[Math.floor(Math.random() * followUps.length)];

    reply = `${start} ${follow}`;
  }

  // personality (VERY LIGHT)
  if (personality === "friend") {
    if (Math.random() < 0.3) {
      reply += ". That’s actually interesting.";
    }
  }

  if (personality === "mentor") {
    reply = "Think about this carefully. " + reply;
  }

  if (personality === "villain") {
    if (Math.random() < 0.5) {
      reply += "... fascinating.";
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
