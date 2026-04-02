import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function generateReply(message, character) {
  if (character === "friend") {
    return "Yo 😄 " + message;
  }
  if (character === "mentor") {
    return "Think about this: " + message;
  }
  if (character === "villain") {
    return "Interesting... " + message + " 😈";
  }
  return message;
}

app.post("/chat", (req, res) => {
  const { message, character } = req.body;
  res.json({ reply: generateReply(message, character) });
});

app.listen(3000, () => console.log("Server running"));
