import React from 'react';

import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add';

import FeedbackList from './FeedbackList';
import Loggin from './Loggin';
import LoggedIn from './LoggedIn';

import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            drawerOpen: false,
            feedbacks: props.feedbacks,
            redirectToAdd: false,
            username: this.props.username
        }
        this.onFeedbackAdded = props.onFeedbackAdded;
        this.onUsernameChange = props.onUsernameChange;
        this.signOutUser = props.signOutUser;
    }

    openDrawer = (event) => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.feedbacks.length !== this.props.feedbacks.length) {
            this.setState({
                feedbacks: this.props.feedbacks
            })
        }
    }

    render() {
        const fabStyle = {
            margin: '5px 15px 0px 0px',
            float: 'right'
        };

        let myFeedbacks = '';

        if (this.state.loggedIn) {
            myFeedbacks = <MenuItem onClick={() => {}}>Show my feedbacks</MenuItem>;
        }

        if (this.state.redirectToAdd) {
            return <Redirect to={{
                pathname: '/addFeedback',
                state: {username: this.state.username},
                feedbackAddedHandler: this.onFeedbackAdded
            }}/>
        }

        return (
            <div>
            <MuiThemeProvider>
                <div>
                  <AppBar 
                    title='Feedbacks' 
                    iconElementRight={this.state.loggedIn ? <LoggedIn signOutUser={() => {
                      this.signOutUser();
                      window.location.reload(); 
                    }} /> : <Loggin onUsernameChange={this.onUsernameChange} loggedIn={this.state.loggedIn} />}
                    onLeftIconButtonClick={this.openDrawer} />
                  <Drawer 
                    open={this.state.drawerOpen}
                    docked={false}
                    width={200}
                    onRequestChange={(drawerOpen) => this.setState({drawerOpen})}>
                    <MenuItem>Add feedback</MenuItem>
                    {myFeedbacks}
                  </Drawer>
                  <FloatingActionButton style={fabStyle} onClick={(ev) => {this.setState({redirectToAdd: true})}}>
                    <ContentAdd />
                  </FloatingActionButton>
                </div>
              </MuiThemeProvider>
              <FeedbackList feedbacks={this.state.feedbacks} />
              </div>
        );
    }
}

export default Dashboard;
