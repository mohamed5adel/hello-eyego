const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(' Hello Eyego😉');
});

app.get('/api/greet', (req, res) => {
  res.send('Hello Eyego');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

