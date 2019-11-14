import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


class Index extends Component {
  state = {
    contentCached: false,
    updateAvailable: false,
  };

  componentDidMount() {
    const config = {
      onUpdate: this.handleUpdate,
    };

    
    serviceWorker.register(config);
  }

  render() {
    return (
      <Router>
        <App updateAvailable={this.state.updateAvailable} />
      </Router>
    );
  }

  handleUpdate = (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    this.setState({ updateAvailable: true});
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
