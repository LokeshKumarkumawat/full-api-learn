const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).json({ name: "lokwh", age: 20 });
});

app.post('/', (req, res) => {
    res.status(200).json({ name: "kumawat", age: 20 });
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})