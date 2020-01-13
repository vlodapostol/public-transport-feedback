import React from 'react';
import ReactDOM from 'react-dom';
import ResetPassword from './ResetPassword';
import { Redirect, BrowserRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

import axios from 'axios';

var validator = require("email-validator");

const ip = "52.59.237.162"

class PasswordRecovery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            codeSent: false,
            code: '',
            recoverClicked: false
        };
    }

    handleRecoverClick(event) {
        var element = <BrowserRouter><div> <ResetPassword /></div> </BrowserRouter>;
        var container = document.getElementById('app');
        ReactDOM.render(element, container);
    }


    render() {

        if (this.state.recoverClicked === true && validator.validate(this.state.email)) {

            var apiUrl = "http://" + ip + ":3001/api/resetpassword";
            var payload = {
                "email": this.state.email
            }
            axios.post(apiUrl, payload)
                .then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        this.setState({ codeSent: true })
                        return <ResetPassword/>
                    }
                }).catch(err => {
                    console.log(err.message);
                });

        }

        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Reset password" showMenuIconButton={false}/>
                        <TextField 
                        hintText="Enter email address"
                        floatingLabelText="Email"
                        onChange={(event, newValue) => this.setState({email:newValue})} 
                        />
                        <br/>
                        <RaisedButton label="Reset" primary={true} style={style} onClick={(event) => this.setState({recoverClicked:true})}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

}

const style = {
    margin: 15
};

export default PasswordRecovery;
