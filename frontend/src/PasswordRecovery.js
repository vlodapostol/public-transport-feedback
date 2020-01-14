import React from "react";
import ReactDOM from "react-dom";
import ResetPassword from "./ResetPassword";
import { Redirect, BrowserRouter } from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import AppBar from "material-ui/AppBar";

import axios from "axios";

var validator = require("email-validator");

const ip = "18.184.87.37";

class PasswordRecovery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      codeSent: false,
      code: "",
      recoverClicked: false
    };
  }

  handleRecoverClick(event) {
    var apiUrl = "http://" + ip + ":3001/api/resetpassword";
    var payload = {
      email: this.state.email
    };
    if (validator.validate(this.state.email)) {
      axios
        .post(apiUrl, payload)
        .then(response => {
          if (response.status == 200) {
            this.setState({ code: response.data.code });
            this.setState({ codeSent: true });
            // var element = <BrowserRouter><div> <ResetPassword resetCode={this.state.code} email={this.state.email} /></div> </BrowserRouter>;
            // var container = document.getElementById('app');
            // ReactDOM.render(element, container);
            this.setState({ recoverClicked: true });
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }

  render() {
    if (this.state.recoverClicked === true) {
      return (
        <ResetPassword resetCode={this.state.code} email={this.state.email} />
      );
    }

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Reset password" showMenuIconButton={false} />
            <TextField
              hintText="Enter email address"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <RaisedButton
              label="Reset"
              primary={true}
              style={style}
              onClick={event => this.handleRecoverClick(event)}
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
