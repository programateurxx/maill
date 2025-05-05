
async function loadMessages(receiver) {
    const response = await fetch(`http://127.0.0.1:5000/messages?receiver=${encodeURIComponent(receiver)}`);
    const data = await response.json();
    
    const chatZone = document.querySelector(".chat-zone");
    chatZone.innerHTML = "";

    data.forEach(msg => { // pour chaque message 
        const msgDiv = document.createElement("div"); // on crée un nouveau div HTML
        msgDiv.textContent = `${msg.sender}: ${msg.text}`; // on lui met le texte des messages
        chatZone.appendChild(msgDiv); // on ajoute ce div au zone de chat
    });
}

setInterval(loadMessages, 1000);  // actualise toutes les secondes

document.querySelector("button").addEventListener("click", async () => {
    const messageInput = document.getElementById("messageInput");
    const text = messageInput.value;
    
    if (text.trim() === "") return;

    const messageData = {
        sender: "Moi", // personne qui envoit
        receiver: "wili", // personne qui reçoit
        text: text // le message meme
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

function selectReceiver(element) {
    const nameSpan = element.querySelector(".conv-name");
    if (nameSpan) {
        currentReceiver = nameSpan.textContent.trim();

        loadMessages(currentMessages);
    }
}