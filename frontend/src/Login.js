import React from 'react';
import { Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import axios from 'axios';
import './App.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            username: '',
            password: '',
            toRegister: false,
            toResetPassword: false,
        };
    }
    
    handleLoginClick(event) {
        var apiUrl = "http://3.122.226.49:3001/api/login";
        console.log(this);
        var payload = {
            "username": this.state.username,
            "password": this.state.password
        };
        axios.post(apiUrl, payload)
            .then((response) => {
                console.log(response);
                console.log(this.props);
                if (response.status == 200) {
                    this.props.onAuth(true);
                    console.log("Login successful");
                } else {
                    this.props.onAuth(false);
                }
            }).catch(err => {
                console.log(err.message);
                this.props.onAuth(false); 
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
                    hintText="Enter username"
                    floatingLabelText="Username"
                    onChange = {(event,newValue) => this.setState({username:newValue})}
                    />
                    <br/>
                    <TextField 
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
