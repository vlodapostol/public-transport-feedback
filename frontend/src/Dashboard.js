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
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';

import FeedbackList from './FeedbackList';
import Loggin from './Loggin';
import LoggedIn from './LoggedIn';

import axios from 'axios';

import { Redirect } from 'react-router-dom';

const ip = "52.59.237.162"

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            drawerOpen: false,
            feedbacks: props.feedbacks,
            redirectToAdd: false,
            username: this.props.username,
            selectedRows: '',
            myFeedbacksShown: false
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

    onSelectedRowsChange = (rows) => {
        this.setState({ selectedRows: rows });
    }

    render() {
        const fabStyle = {
            margin: '5px 15px 0px 0px',
            float: 'right'
        };

        let myFeedbacks = '';

        if (this.state.loggedIn) {
            myFeedbacks =
                <div>
                <MenuItem onClick={() => {
                    console.log(this.state.username);
                    axios.get('http://' + ip + ':3001/api/user/' + this.state.username + '/feedback')
                        .then((result) => {
                            this.setState({feedbacks: result.data, myFeedbacksShown: true});
                        }).catch(err => {
                            console.log(err);
                        })
                    
                }}>Show my feedbacks</MenuItem>
                <MenuItem onClick={ () => {
                    axios.get('http://' + ip + ':3001/api/feedback/getall')
                        .then(feedbacks => {
                            this.setState({ feedbacks: feedbacks.data, myFeedbacksShown: false });
                        }).catch(err => {
                            console.log(err); 
                        });
                }}>Show all feedbacks</MenuItem>
                </div>
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
                    <MenuItem>Search</MenuItem>
                    {myFeedbacks}
                  </Drawer>
                  <FloatingActionButton style={fabStyle} onClick={(ev) => {this.setState({redirectToAdd: true})}}>
                    <ContentAdd />
                  </FloatingActionButton>
                  { this.state.loggedIn && this.state.myFeedbacksShown && 
                  <div>
                    <FloatingActionButton backgroundColor='GoldenRod' style={{float: 'right', margin: '66px -56px 0px 0px'}} onClick={() => {this.handleDelete();}}>
                        <EditIcon />
                    </FloatingActionButton>
                    <FloatingActionButton backgroundColor='red' style={{float: 'right', margin: '130px -56px 0px 0px'}}>
                        <DeleteIcon />
                    </FloatingActionButton>
                   </div>
                  }
                </div>
              </MuiThemeProvider>
              <FeedbackList onSelectedRowsChange={this.onSelectedRowsChange} feedbacks={this.state.feedbacks} />
              </div>
        );
    }
}

export default Dashboard;
