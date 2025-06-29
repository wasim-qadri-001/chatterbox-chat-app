const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws, req) => {
  const params = new URLSearchParams(req.url.slice(1));
  const room = params.get("room");
  const user = params.get("user");

  // Log welcome
  console.log(`🟢 ${user} joined room: ${room}`);

  // Broadcast welcome message
  ws.send(JSON.stringify({
    user: "System",
    message: `Welcome to ${room}, ${user}!`,
    time: new Date().toLocaleTimeString()
  }));

  // When user sends a message
  ws.on("message", (msg) => {
    const parsed = JSON.parse(msg);
    console.log(`📨 ${user} says: ${parsed.message}`); // Log to terminal

    const message = JSON.stringify({
      user,
      message: parsed.message,
      time: new Date().toLocaleTimeString(),
    });

    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
