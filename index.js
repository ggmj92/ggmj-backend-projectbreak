const express = require('express');
const app = express();
PORT = 3000;

app.get('/', (req, res) => (res.send("GGMJ's Backend Project")))

app.listen(PORT, () => {
    console.log(`Express listening on port http://localhost:${PORT}`);
});

