document.getElementById('encryptionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const text = document.getElementById('text').value;
    const method = document.getElementById('method').value;
    const shift = parseInt(document.getElementById('shift').value, 10);

    const response = await fetch('http://localhost:3000/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, method, shift })
    });

    const data = await response.json();
    document.getElementById('output').textContent = data.encryptedText || 'Error';
});
