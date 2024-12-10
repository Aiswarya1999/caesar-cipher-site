const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Simple Caesar Cipher Implementation
function caesarCipher(text, shift) {
    return text.split('').map(char => {
        if (!char.match(/[a-zA-Z]/)) return char; // Skip non-alphabet characters
        const base = char.charCodeAt(0) >= 97 ? 97 : 65; // Determine if lower or uppercase
        return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
    }).join('');
}

// API endpoint for encryption
app.post('/encrypt', (req, res) => {
    const { text, method, shift } = req.body;
    console.log({ text, method, shift }); // Log incoming request data

    if (!text || !method) {
        return res.status(400).send('Invalid request.');
    }

    let encryptedText = '';
    if (method === 'caesar') {
        encryptedText = caesarCipher(text, shift);
    } else {
        return res.status(400).send('Unsupported encryption method.');
    }

    res.send({ encryptedText });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
