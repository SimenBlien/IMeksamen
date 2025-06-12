const Websocket = require("ws"); // definerer websocket modul
const socket = new Websocket("ws:localhost:8080"); //setter socket (server connection) til riktig addresse og port 
const readline = require("readline"); // definerer readline modul
let username = "unknown"; // setter username varabel og deafault username til unknown
const crypto = require("crypto");

// Oppsett av AES krypteringen
const algorithm = "aes-256-cbc";
const key = Buffer.from("12345678901234567890123456789012"); // 32-byte delt nøkkel

// Krypterer meldinger med en unik IV
function encryptMessage(message) {
    const iv = crypto.randomBytes(16); // Genererer en ny IV for hver melding
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(message, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`; // Kombinerer IV og kryptert melding
}

// Dekrypterer meldinger ved å hente ut IV-en
function decryptMessage(encryptedMessage) {
    const [ivHex, encrypted] = encryptedMessage.split(":"); // Deler opp IV og kryptert melding
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

socket.on("message", message => { // når client mottar melding fra server så skal denne funksjonen kalles 
    msg = message.toString(); // filtrerer ut melding med on string
    console.log(decryptMessage(msg)); // logger melding til terminalvinduet
})

socket.on("open", () => { // når connection åpnes så skal løkken her kjøre
    console.log("Du har koblet til serveren"); // veileder bruker om at de har koblet seg til server og at det fungerte 

    const rl = readline.createInterface ({ // definerer brukergrensesnitt med readline til default input/output 
        input: process.stdin,
        output: process.stdout
    })

    rl.question("Skriv inn et brukernavn", name => { // bruker rl grensesnittet til å få en variabel name (ønsket brukernavn)
        username = name; // setter username til name/ ønsket brukernavn
        console.log(`Brukernavn satt til ${username}`); //logger nytt brukernavn
        socket.send(encryptMessage(`Ny klient med brukernavn ${username}`)) //sender info om ny bruker med nytt navn til andre tilkobklede clienter
    })

    rl.on("line", input => { //kjører hver gang bruker trykker enter. tar input (det brukeren har skrevet) som parameter
        socket.send(encryptMessage(`${username}: ${input}`)) // sender melding til resten av brukerne med brukernavn og melding
    })



})