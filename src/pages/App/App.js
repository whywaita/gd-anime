import React, { Component } from 'react';

import SearchBox from '../../components/SearchBox';

import logo from '../../logo.svg';
import './App.css';

const CLIENT_ID = '690342539328-3ogd9uvt8sv4v1btg47j02dmkk3dba9g.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {gapiReady: false}
  }

  loadGoogleDriveApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.load('auth2', 'drive', () => {
          this.setState({ gapiReady: true });
        });
        this.initClient();
      });
    };

    document.body.appendChild(script);
  };

  initClient = ()=> {
    if (this.state.gapiReady) {
      window.gapi.client.init({
        "clientId": CLIENT_ID,
        "scope": SCOPES,
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
      }).then(()=>{
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        this.eventListen();
      });
    } else {
      setTimeout(() => {this.initClient()}, 100);
    }

  };
  
  eventListen = ()=>{
    const button = document.querySelector("button")
    if(!button){return}
    button.addEventListener("click", ()=>{
      if(window.gapi.auth2.getAuthInstance().isSignedIn.get()){
        // already signedin, do nothing.
      } else {
        window.gapi.auth2.getAuthInstance().signIn();
      }
    });
  }

  async componentDidMount() {
    await this.loadGoogleDriveApi();
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <p><button className='Button ButtonPrimary'>Auth with Google</button></p>
        <SearchBox />
      </div>
    );
  }
}

export default App;