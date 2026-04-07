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
