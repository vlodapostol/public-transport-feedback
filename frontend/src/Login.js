import React from 'react';
import { Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import App from './App';

import axios from 'axios';
import './App.css';

const ip = "52.59.237.162"

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            username: '',
            password: '',
            toRegister: false,
            toResetPassword: false,
            loggedIn: this.props.location.state.loggedIn,
            authSuccessful: false,
            redirectToAdd: false
        };
        this.onUsernameChange = this.props.location.userNameCallback;
    }

    handleLoginClick(event) {
        var apiUrl = "http://" + ip + ":3001/api/login";
        var payload = {
            "username": this.state.username,
            "password": this.state.password
        };
        axios.post(apiUrl, payload)
            .then((response) => {
                if (response.status == 200) {
                    console.log(this.state.username)
                    this.onUsernameChange(this.state.username);
                    this.setState({ authSuccessful: true })
                }
            }).catch(err => {
                console.log(err.message);
                this.refs.userNameTf.state.errorText = 'Please check your username';
                this.refs.passwordTf.state.errorText = 'Please check your password';
                this.refs.passwordTf.focus();
                this.refs.userNameTf.focus();
            });

    }

    render() {

        if (this.state.authSuccessful === true) {
            return <Redirect to='/' />
        }

        if (this.state.toRegister === true) {
            return <Redirect to='/register' />;
        }

        if (this.state.toResetPassword === true) {
            return <Redirect to='/resetpassword' />;
        }

        return (
            <div>
            <MuiThemeProvider>
                <div>
                <AppBar title="Login" showMenuIconButton={false}/>
                    <TextField 
                    ref='userNameTf'
                    hintText="Enter username"
                    floatingLabelText="Username"
                    onChange = {(event,newValue) => this.setState({username:newValue})}
                    />
                    <br/>
                    <TextField 
                    ref='passwordTf'
                    type="password"
                    hintText="Enter password"
                    floatingLabelText="Password"
                    onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                    <br/>
                    <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.handleLoginClick(event)}/>
                    <RaisedButton label="Register" primary={true} style={style} onClick={(event) => this.setState({toRegister:true})}/>
                    <br/>
                    <h5 className="h5" onClick={(event) => this.setState({toResetPassword:true})}>Reset your password</h5>
                </div>
            </MuiThemeProvider>
        </div>
        );
    }
}

const style = {
    margin: 15
};

export default Login;
