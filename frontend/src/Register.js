import React from 'react';
import { Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import axios from 'axios';

const ip = "52.59.237.162"

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
        var apiUrl = "http://" + ip + ":3001/api/register";
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
             title="Register" showMenuIconButton={false}/>
           <TextField
             hintText="Enter username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Register" primary={true} style={style} onClick={this.handleClickRegister}/>
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
