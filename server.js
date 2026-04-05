import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function generateReply(message, personality) {
function generateReply(message, personality) {
  const msg = message.toLowerCase();

  // base responses
  let reply = "";

  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Hey 😄 what's going on?";
  } else if (msg.includes("how are you")) {
    reply = "I'm doing pretty good honestly. How about you?";
  } else if (msg.includes("story")) {
    reply = "Alright… 🌌\n\nThere was once a city where nobody could lie. One day, someone whispered something forbidden—and reality started breaking...";
  } else if (msg.includes("sad")) {
    reply = "Hey… I'm here with you. You don't have to go through it alone 💛";
  } else {
    reply = "Hmm… tell me more 🤔";
  }

  // personality layer (this makes it feel real)
  if (personality === "friend") {
    reply = reply + " 😂 not gonna lie that's kinda wild";
  }

  if (personality === "mentor") {
    reply = "Take a moment to reflect. " + reply;
  }

  if (personality === "villain") {
    reply = reply + "…how intriguing 😈";
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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
