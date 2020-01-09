import React, { Component } from 'react';

import AddFeedback from './AddFeedback';
import FeedbackList from './FeedbackList';
import Login from './Login'
import Register from './Register'
import PasswordRecovery from './PasswordRecovery'
import SearchedResult from './SearchedResult'
import CreateFeedback from './CreateFeedback'

import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

class Loggin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toLogIn: false
    }
  }
  
  static muiName = 'FlatButton';

  render() {
    if(this.state.toLogIn) {
      return <Redirect to={
        {
          pathname: '/login',
          state: { 'test': '123' }
        }
      }/>;
    }
    
    return (
      <FlatButton {...this.props} label="Login" onClick={(ev) => {
        this.setState({toLogIn: true})
      }} />
    );
  }
}

const Logged = (props) => (
    <IconMenu
      {...props}
      iconButtonElement={<IconButton><MoreVertIcon color='white' /></IconButton>}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
    <MenuItem primaryText="Settings" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      feedbacks: [],
      drawerOpen: false,
      loggedIn: false,
      currentUser: {
        userId: -1,
        userName: 'Guest',
        email: '',
        password: ''
      }, 
      authSuccessful: false
    };
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
  }

  render() {
    return (
      <div className="App" id='app'>
        <Router>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path='/addFeedback'>
              <CreateFeedback />
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/resetpassword">
              <PasswordRecovery/>
            </Route>
            <Route path='/result'>
              <SearchedResult feedbackList={this.state.feedbacks} keywords='blue submarine' />
            </Route>
            <Route path="/">
              <MuiThemeProvider>
                <div>
                  <AppBar 
                    title='Feedbacks' 
                    iconElementRight={this.state.loggedIn ? <Logged /> : <Loggin />}
                    onLeftIconButtonClick={this.openDrawer} />
                  <Drawer 
                    open={this.state.drawerOpen}
                    docked={false}
                    width={200}
                    onRequestChange={(drawerOpen) => this.setState({drawerOpen})}>
                    <MenuItem>First item</MenuItem>
                    <MenuItem>Second item</MenuItem>
                  </Drawer>
                </div>
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