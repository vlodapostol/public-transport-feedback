import React from 'react';

import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import FeedbackList from './FeedbackList';
import Loggin from './Loggin';

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

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            drawerOpen: false,
            feedbacks: props.feedbacks
        }
        this.onUsernameChange = props.onUsernameChange;
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
        return (
            <div>
            <MuiThemeProvider>
                <div>
                  <AppBar 
                    title='Feedbacks' 
                    iconElementRight={this.state.loggedIn ? <Logged /> : <Loggin onUsernameChange={this.onUsernameChange} loggedIn={this.state.loggedIn} />}
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
              </div>
        );
    }
}

export default Dashboard;
