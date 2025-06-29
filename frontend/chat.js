// Extract room & username from URL and localStorage
const urlParams = new URLSearchParams(window.location.search);
const room = urlParams.get("room");
const username = localStorage.getItem("username") || "Guest";

// Set room title in UI
document.getElementById("room-title").textContent = `Room: ${room}`;

// Connect to WebSocket server
const ws = new WebSocket(`ws://localhost:3000?room=${room}&user=${username}`);

// Debug: confirm connection
ws.onopen = () => {
  console.log("✅ WebSocket connected to server.");
};

// Handle form submission (send message)
const messages = document.getElementById("messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("messageInput");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (msg) {
    console.log("📤 Sending:", msg);  // Debug
    ws.send(JSON.stringify({ message: msg }));
    input.value = "";
  }
});

// Handle incoming messages
ws.onmessage = (event) => {
  console.log("📩 Received:", event.data);  // Debug
  const data = JSON.parse(event.data);
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<strong>${data.user}</strong> [${data.time}]: ${data.message}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
};

// Optional: handle errors and close
ws.onerror = (err) => {
  console.error("❌ WebSocket error:", err);
};

ws.onclose = () => {
  console.warn("⚠️ WebSocket closed");
};
