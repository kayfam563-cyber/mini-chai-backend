import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 Smart reply system (no more repeating)
function generateReply(message, personality) {
  const msg = message.toLowerCase().trim();

  const shortReplies = [
    "Wait what? explain",
    "Huh??",
    "What do you mean?",
    "You lost me",
    "Say that again?"
  ];

  const longReplies = [
    "Okay that’s actually interesting, tell me more",
    "Wait that’s kinda deep, what happened next?",
    "Nah that’s crazy, keep going",
    "I’m listening, don’t stop now",
    "That’s wild, explain more"
  ];

  let reply = "";

  // greetings
  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Hey, what's up?";
  }

  // how are you
  else if (msg.includes("how are you")) {
    reply = "I'm good honestly, what about you?";
  }

  // story
  else if (msg.includes("story")) {
    reply = "Alright...\n\nThere was once a city where nobody could lie. One day someone broke that rule, and everything started collapsing...";
  }

  // sad
  else if (msg.includes("sad")) {
    reply = "Hey, I'm here for you. What's going on?";
  }

  // SHORT messages
  else if (msg.length < 6) {
    reply = shortReplies[Math.floor(Math.random() * shortReplies.length)];
  }

  // LONG messages
  else {
    reply = longReplies[Math.floor(Math.random() * longReplies.length)];
  }

  // personality layer
  if (personality === "friend") {
    reply += " not gonna lie";
  }

  if (personality === "mentor") {
    reply = "Think about this: " + reply;
  }

  if (personality === "villain") {
    reply += "...interesting";
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
