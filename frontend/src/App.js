import React, { Component } from 'react';

import AddFeedback from './AddFeedback';
import FeedbackList from './FeedbackList';
import Login from './Login'
import Register from './Register'
import PasswordRecovery from './PasswordRecovery'
import SearchedResult from './SearchedResult'

import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab} from 'material-ui/Tabs';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      feedbacks: [],
      drawerOpen: false
    };
  }
  
  onFeedbackAdded = (feedback) => {
    const newFeedbacks = this.state.feedbacks;
    newFeedbacks.push(feedback);
    this.setState({
      feedbacks: newFeedbacks
    });
  }
  
  componentDidMount = () => {
    axios.get('http://3.122.226.49:3001/api/user/1/feedback')
    .then(feedbacks => {
      this.setState({
        feedbacks: feedbacks.data
      });
    });
  }
  
  openDrawer = (event) => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
    
    alert(this.state.drawerOpen);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path='/result'>
              <SearchedResult feedbackList={this.state.feedbacks} keywords='blue submarine' />
            </Route>
            <Route path="/">
              <MuiThemeProvider>
                <AppBar 
                  title='Feedbacks' 
                  onLeftIconButtonClick={this.openDrawer} />
              </MuiThemeProvider>
              <FeedbackList feedbacks={this.state.feedbacks} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;