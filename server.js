const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {Translate} = require('@google-cloud/translate');
const ISO6391 = require('iso-639-1');

const mongoose = require('mongoose');
require('./db');
const Translation = mongoose.model("Translation");
const Language = mongoose.model("Language");

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  // To obtain credentials, go to https://cloud.google.com/translate/docs/quickstart
  process.env.GOOGLE_APPLICATION_CREDENTIALS = "ENTER THE PATH TO YOUR GOOGLE APPLICATION CREDENTIALS HERE";
}

const projectId = 'translator-222623'; // Change this to the projectId listed in your credentials json file
const translate = new Translate({projectId: projectId});

app.post('/detectLanguage', (req, res) => {
  const input = req.body.input;

  Language.findOne({input: input}, function(err, language) {
    if (language) {
      console.log("Language found in database");
      res.send(language.language);
    } else {
      translate.detect(input).then(languages => {
        const language = ISO6391.getName(languages[0].language);
    
        new Language({
          input: input,
          language: language
        }).save(function(err) {
          if (err) console.log("Error storing language to database");
          res.send(language);
        });
      }).catch(err => {
        res.send("ERROR!");
      });
    }
  })
});

app.post('/translate', (req, res) => {
  const input = req.body.input;

  Translation.findOne({input: input}, function (err, translation) {
    if (translation) {
      console.log("Translation found in database");
      res.send(translation.translation);
    } else {
      translate.translate(input, "en").then(translations => {
        const translation = translations[0];
    
        new Translation({
          input: input,
          translation: translation
        }).save(function(err) {
          if (err) console.log("Error storing translation to database");
          res.send(translation);
        });
      }).catch(err => {
          res.send("ERROR!");
      });
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));