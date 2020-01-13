import React from 'react';
import { Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import axios from 'axios';

const ip = "18.197.27.165"

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            finishedRegistration: false
        };
    }

    handleClickRegister(event) {
        var apiUrl = "http://" + ip + ":3001/api/resetpassword";
        var payload = {
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password
        };

        axios.post(apiUrl, payload)
            .then((response) => {
                console.log(response);
                console.log(response.status)
                if (response.status == 201) {
                    this.setState({
                        finishedRegistration: true
                    });
                    console.log("registered");
                }
            }).catch((err) => {
                console.log(err.message);
            });
    }

    render() {

        if (this.state.finishedRegistration === true) {
            return <Redirect to="/login" />
        }

        return (
            <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Reset password" showMenuIconButton={false}/>
           <TextField
             hintText="Enter code"
             floatingLabelText="Code"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Reset" primary={true} style={style} onClick={this.handleClickReset}/>
          </div>
         </MuiThemeProvider>
      </div>
        );
    }
}

const style = {
    margin: 15
};

export default Register;
