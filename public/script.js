let ioServer = io();
let messages = document.querySelector("section ul");
let input = document.querySelector("input");

// Luister naar het submit event
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  // Als er überhaupt iets getypt is
  if (input.value) {
    // Stuur het bericht naar de server
    ioServer.emit("message", input.value);

    // Leeg het form field
    input.value = "";
  }
});

// Luister naar berichten van de server
ioServer.on("message", (message) => {
  addMessage(message.uid, message.message);
});

/**
 * Impure function that appends a new li item holding the passed message to the
 * global messages object and then scrolls the list to the last message.
 * @param {*} message the message to append
 */

function addMessage(uid, message) {
  // er is een uid voor het bericht en de ioServer.id is voor de gebruiker.
  let messageClass = "";

  if (uid) {
    // Alle kinderen van de variabele messages krijgen een li eraan toegevoegd
    const messageConst = messages.appendChild(
      Object.assign(document.createElement("li"), { textContent: message })
    );

    // als de message id overeenkomt met de ioServer id dan is het bericht van de gebruiker zelf
    // Er wordt een class met de uitlijning aan het variabele messageConst toegevoegd
    if (uid == ioServer.id) {
      messageConst.classList.add("eigen-bericht");
    }
    messages.scrollTop = messages.scrollHeight;
  }
}
