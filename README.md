# Terminal chat
# Hvordan kan jeg sette opp prosjektet på egen hånd?
## 1. Innstallering og forarbeid
Dette prosjektet er en enkel terminalbasert chat-applikasjon som bruker WebSocket for kommunikasjon mellom klienter og server. Meldinger som sendes mellom klientene er kryptert med AES-256 for ekstra sikkerhet.

### 1.1 Installer Node.js og muduler
Sørg for at du har Node.js installert på din maskin. Du kan laste det ned fra [Node.js sin offisielle nettside](https://nodejs.org/).

Etter du har lastet ned node kan du kjøre følgende kommando i terminalen for å få lastet ned websockets: 
```bash
npm install ws
```

### 1.2 Last ned prosjektet
Last ned prosjektet som en ZIP-fil fra denne lenken [min github profil](https://github.com/SimenBlien/IMeksamen.git) eller klon det fra GitHub ved å bruke følgende kommando i terminalen:
```bash
git clone https://github.com/SimenBlien/IMeksamen.git
```
### 1.3 Navigering i terminalen
Bruk kommandoene under for å navigere rundt i terminalen:
- Gå inn i en mappe:
```bash
cd mappenavn
```
- Gå ut av en mappe:
```bash
cd ..
```
- Få en liste over filer og mappen i mappen du er i:
```bash
ls
```
## 2. Oppsett av prosjektet
### 2.1 Sett opp både server og klienter selv lokalt
For å sette opp dette lokalt på egen hånd kan du starte med å åpne et terminalvindu for serveren. Naviger deg til mappen hvor du lastet ned prosjektet. Om du syntes dette er vanskelig kan du se seksjon nummer 3 for navigering i terminalen. Når du er i mappen kan du kjøre kommandoen
```bash
node server.js
```
Du skal få følgende melding tilbake: Serveren har startet på port 8080.

Etter du har gjor dette kan du åpne et til terminalvindu (repeter dette for anntall klienter du ønsker å ta med)
Naviger deg igjen til mappen hvor du har prosjektet og kjør følgende kommando: 
```bash
node client.js
```
Skriv inn et brukernavn og du er ferdig!

### 2.2 Sett opp både server og klienter selv, på ulike maskiner (Mer avansert en å kjøre det lokalt)
##### På maskinen du ønsker å hoste serveren: 
Åpne et terminalvindu og naviger deg til der hvor du har prosjektet. Kjør følgende kommando for å starte serveren: 
```bash
node server.js
```
##### Koble til klienter fra egen maskin:
Naviger deg igjen til mappen hvor du har prosjektfilene i terminalen, og kjør følgende kommando (Kjør programmet uten endringer fra du lastet det ned):
```bash
node client.js
```

##### Koble til klienter fra en annen maskin:
For å koble til en klient til din server fra en annen maskin er det noen ting du må være klar over og endre på: 
- Maskinene burde være på samme nettverk 
- Endre kodelinjen under og erstatt "localhost" i lenken til ip-en til maskinen du ønsker å koble til. Denne linjen kan du finne i linje 2 av klient koden. Du kan åpne koden i for eksempel Visual Studio Code eller notater for å endre på koden. Husk å lagre. 
```javascript
const socket = new Websocket("ws:localhost:8080"); 
```
Når dette er gjort kan du kjøre kommandoen under i samme mappe som prosjektet i terminalen: 
```bash
node client.js
```
##### Hvordan finne ip på ulike operativsystemer 
 - Windows -> ipconfig
 - MacOS -> ipconfig getifaddr en0
 - linux -> ip addr 



### 2.3 Koble deg på som klient til en allerede eksisterende server (feks om du vil koble deg på hos en venn)
For å koble deg på som klient på en server som allerede er oppe trenger du ikke tenke på å hoste/kjøre sereveren selv. Derfor trenger du kun å sette opp klientkoden. Les derfor fra underoverskriften "Koble til klienter fra en annen maskin". Underoverskriften kan du finen under punkt 2.2.