import * as React from 'react';
import './App.css';

import logo from './logo.svg';

export interface IAppState {
  zipcode: string;
  address: string;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      address: '',
      zipcode: ''      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <p className="App-intro">
            <input type="text" value={this.state.zipcode} onChange={this.handleChange} />
            <input type="submit" value="検索" />
          </p>
        </form>
        <p>{this.state.address}</p>
      </div>
    ); 
  }

  public handleChange(e: any) {
    this.setState({ zipcode: e.target.value });
  }

  public handleSubmit(e: any) {
    fetch(`https://api.zipaddress.net/?zipcode=${this.state.zipcode}`, {
      mode: 'cors'
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({ address: myJson.data.fullAddress });
      });
    e.preventDefault();
  }
}

export default App;
