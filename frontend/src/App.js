import React, { Component } from 'react';

import AddFeedback from './AddFeedback';
import FeedbackList from './FeedbackList';
import Login from './Login'
import Register from './Register'
import PasswordRecovery from './PasswordRecovery'
import SearchedResult from './SearchedResult'
import CreateFeedback from './CreateFeedback'
import Loggin from './Loggin'
import Dashboard from './Dashboard'

import { Helmet } from "react-helmet";

import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
}
from "react-router-dom";

import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

const ip = "52.59.237.162"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
      drawerOpen: false,
      loggedIn: false,
      username: 'Guest',
    };
  }

  onUsernameChange = (username) => {
    this.setState({ username: username });
    this.setState({ loggedIn: true });
  }

  onAuth = (authStatus) => {
    this.setState({
      authSuccessful: authStatus
    })
  }

  onFeedbackAdded = (feedback) => {
    const newFeedbacks = this.state.feedbacks;
    newFeedbacks.push(feedback);
    this.setState({
      feedbacks: newFeedbacks
    });
  }

  componentDidMount = () => {
    axios.get('http://' + ip + ':3001/api/feedback/getall')
      .then(feedbacks => {
        this.setState({
          feedbacks: feedbacks.data
        });
      });
  }

  signOutUser = () => {
    this.setState({
      loggedIn: false,
      username: 'Guest'
    })
  }

  render() {
    return (
      <div className="App" id='app'>
        <Helmet>
          <title>Our wonderful app</title>
        </Helmet>
      
        <Router>
          <Switch>
            <Route path="/login" component={Login} onUsernameChange={this.onUsernameChange} />
            <Route path='/addFeedback' component ={CreateFeedback} />
            <Route path="/register" component={Register} onUsernameChange={this.onUsernameChange} />
            <Route path="/resetpassword" component={PasswordRecovery} />
            <Route path='/result' >
              <SearchedResult feedbackList={this.state.feedbacks} keywords='blue submarine' />
            </Route>
            <Route path="/" render={() => <Dashboard 
                         feedbacks={this.state.feedbacks}
                         onFeedbackAdded={this.onFeedbackAdded}
                         signOutUser={this.signOutUser}
                         onUsernameChange={this.onUsernameChange}
                         loggedIn={this.state.loggedIn}
                         username={this.state.username}/>
            }
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
