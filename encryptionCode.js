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