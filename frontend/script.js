function createRoom() {
  const name = document.getElementById('roomName').value.trim();
  if (name) {
    const roomId = `${name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).slice(2, 6)}`;
    window.location.href = `chat.html?room=${roomId}`;
  }
}

function joinRoom() {
  const roomId = document.getElementById('roomId').value.trim();
  if (roomId) {
    window.location.href = `chat.html?room=${roomId}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username") || "Guest";
  document.getElementById("username").textContent = username;
});
