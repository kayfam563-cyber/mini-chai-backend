import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 Memory storage (simple version)
let chatHistory = [];

// 🧠 Smarter reply using context
function generateReply(message, personality) {
  const msg = message.toLowerCase().trim();

  // look at last message for context
  const lastMessage = chatHistory.length > 0 
    ? chatHistory[chatHistory.length - 1].user 
    : "";

  let reply = "";

  // greetings
  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Hey, what's up?";
  }

  // confused replies
  else if (msg.includes("what do you mean") || msg.includes("huh")) {
    if (lastMessage.includes("story")) {
      reply = "I was talking about the story I just mentioned.";
    } else {
      reply = "I'm just responding to what you said earlier.";
    }
  }

  // continue story
  else if (msg.includes("story") || lastMessage.includes("story")) {
    reply = "Alright... continuing the story:\n\nThe sky started flickering like a broken screen, and people began forgetting who they were...";
  }

  // emotional support
  else if (msg.includes("sad")) {
    reply = "I'm here for you. Do you want to talk about it?";
  }

  // general replies
  else if (msg.length < 6) {
    reply = "Can you explain that a bit more?";
  } else {
    reply = "That's interesting. Tell me more about that.";
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
