const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {Translate} = require('@google-cloud/translate');

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  // To obtain credentials, go to https://cloud.google.com/translate/docs/quickstart
  process.env.GOOGLE_APPLICATION_CREDENTIALS = "ENTER THE PATH TO YOUR GOOGLE APPLICATION CREDENTIALS HERE";
}

const projectId = 'translator-222623'; // Change this to the projectId listed in your credentials json file
const translate = new Translate({projectId: projectId});

app.post('/detectLanguage', (req, res) => {
  const input = req.body.input;

  translate.detect(input).then(languages => {
    res.send(languages[0].language);
  }).catch(err => {
    res.send("ERROR!");
  });
});

app.post('/translate', (req, res) => {
  const input = req.body.input;

  translate.translate(input, "en").then(translations => {
    res.send(translations[0]);
  }).catch(err => {
      res.send("ERROR!");
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));