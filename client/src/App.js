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

    const languageDetected = await response.text();

    this.setState({
      language: languageDetected,
      languageDisplay: 'block'
    });
  }

  getTranslation = async e => {
    const response = await fetch('/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: this.state.input }),
    });

    const translation = await response.text();

    this.setState({
      translation: translation,
    });
  }

  translate(event) {
    this.getLanguage();
    this.getTranslation();
  };

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
