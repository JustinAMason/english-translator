const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/translator');

const Schema = mongoose.Schema;

const LanguageSchema = new mongoose.Schema({
    input: String,
    language: String
})

const TranslationSchema = new mongoose.Schema({
    input: String,
    translation: String
});

mongoose.model("Language", LanguageSchema)
mongoose.model("Translation", TranslationSchema);
mongoose.connect("mongodb://localhost/translator");