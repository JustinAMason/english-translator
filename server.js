const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/detectLanguage', (req, res) => {
  res.send("Langauge!");
});

app.post('/translate', (req, res) => {
  res.send("Translation!");
});

app.listen(port, () => console.log(`Listening on port ${port}`));