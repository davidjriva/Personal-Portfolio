import { WebSocketServer } from "ws";
import fetch from "node-fetch";

const PORT = 3001;
const LAMBDA_URL = process.env.AWS_LAMBDA_URL; // your Lambda Function URL
NEXT_PUBLIC_WS_AUTH_TOKEN = process.env.NEXT_PUBLIC_WS_AUTH_TOKEN;

// Start WebSocket server
const wss = new WebSocketServer({ port: PORT });
console.log(`WebSocket server listening on ws://localhost:${PORT}`);

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (message) => {
    const { userMessage, sessionId, token } = JSON.parse(message);

    // Optional: basic auth check
    if (NEXT_PUBLIC_WS_AUTH_TOKEN && token !== NEXT_PUBLIC_WS_AUTH_TOKEN) {
      ws.send(JSON.stringify({ error: "Unauthorized" }));
      return;
    }

    try {
      const res = await fetch(LAMBDA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, sessionId }),
      });

      if (!res.ok) {
        ws.send(JSON.stringify({ error: `Lambda error: ${res.status}` }));
        return;
      }

      const data = await res.json();
      ws.send(JSON.stringify({ answer: data.answer }));
    } catch (err) {
      ws.send(JSON.stringify({ error: err.message }));
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
