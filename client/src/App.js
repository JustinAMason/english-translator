import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      input: '',
      language: '',
      translation: '',
      languageDisplay: 'none'
    };

    this.translate = this.translate.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  getLanguage = async e => {
    const response = await fetch('/detectLanguage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: this.state.input }),
    });

    return(await response.text());
  }

  getTranslation = async e => {
    const response = await fetch('/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: this.state.input }),
    });

    return(await response.text());
  }

  translate = async e => {
    const language = await this.getLanguage();
    const translation = await this.getTranslation();
    this.setState({
      language: language,
      languageDisplay: 'block',
      translation: translation
    })
  }

  updateInput(event) {
    this.setState({
      input: event.target.value,
      translation: '',
      languageDisplay: "none"
    });
  }

  render() {
    return (
      <div>
        <textarea id="input_box" name="input_box" rows="10" cols="90" placeholder="Enter text here" onChange={this.updateInput}></textarea>
        <input type="submit" value="Translate to English" onClick={this.translate}/>
        <textarea id="output_box" name="output_box" rows="10" cols="90" placeholder="Translation will appear here" value={this.state.translation}/>
        <p style={{display:this.state.languageDisplay}}>(translated from {this.state.language})</p>
      </div>
    );
  }
}

export default App;
