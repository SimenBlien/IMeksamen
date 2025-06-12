const Websocket = require("ws"); //definerer websocket modulen 
const port = "8080"; //setter en variabel port så jeg kan bruke den rundt i koden
const server = new Websocket.Server({port: port}); //definerer en ny websocket server med ønsket port

server.on("connection", socket => { //en on connection funksjon som kjører når server får connection med klient, socket representerer connection 
    socket.on("message", message => { //når server mottar melding fra klient kjører denne funksjonen med meldingen som parameter message
        msg = message.toString(); // websocket sender melding som et slags objekt, så jeg filtrerer ut tekstev ved hjelp av onString()
        console.log(msg); // logger meldingen i consollen til client
        server.clients.forEach(client => {             //funksjon som kjører for hver client koblet til server
            if (socket !== client) {
                client.send(msg); // sender melding til klient
            }
        })
    })
})
console.log(`Serveren har startet på port ${port}`) //logger melding om at server har startet