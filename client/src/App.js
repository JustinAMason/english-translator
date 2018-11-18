import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div>
        <textarea id="input_box" name="input_box" rows="10" cols="90" placeholder="Input Text"></textarea>
        <input type="submit" value="Translate to English"/>
        <textarea id="output_box" name="output_box" rows="10" cols="90" placeholder="Translation"></textarea>
      </div>
    );
  }
}

export default App;
