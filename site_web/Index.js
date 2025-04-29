
async function loadMessages() {
    const response = await fetch("http://127.0.0.1:5000/messages");
    const data = await response.json();
    
    const chatZone = document.querySelector(".chat-zone");
    chatZone.innerHTML = "";

    data.forEach(msg => {
        const msgDiv = document.createElement("div");
        msgDiv.textContent = `${msg.sender}: ${msg.text}`;
        chatZone.appendChild(msgDiv);
    });
}

setInterval(loadMessages, 1000);  // actualise toutes les secondes

document.querySelector("button").addEventListener("click", async () => {
    const messageInput = document.getElementById("messageInput");
    const text = messageInput.value;
    
    if (text.trim() === "") return;

    const messageData = {
        sender: "Moi",
        receiver: "wili",
        text: text
    };

    await fetch("http://127.0.0.1:5000/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    });

    messageInput.value = "";
});