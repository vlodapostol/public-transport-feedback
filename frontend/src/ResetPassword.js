import React from "react";
import { Redirect } from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import axios from "axios";

const ip = "18.184.87.37";

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recoveryCode: props.resetCode,
            email: props.email,
            typedCode: "",
            newPassword: "",
            finishedReset: false
        };
    }

    handleClickReset(event) {
        var apiUrl = "http://" + ip + ":3001/api/resetpassword/" + this.state.email;
        var payload = {
            email: this.state.email,
            newPassword: this.state.newPassword
        };
        if (this.state.typedCode == this.state.recoveryCode) {
            axios
                .put(apiUrl, payload)
                .then(response => {
                    if (response.status == 200) {
                        this.setState({
                            finishedReset: true
                        });
                        console.log("password updated");
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }

    render() {
        if (this.state.finishedReset === true) {
            return <Redirect to="/" />;
        }

        return (
            <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Reset password" showMenuIconButton={false} />
            <TextField
              hintText="Enter recovery code"
              floatingLabelText="Code"
              onChange={(event, newValue) =>
                this.setState({ typedCode: newValue })
              }
            />
            <br />
            <TextField
              type="password"
              hintText="Enter password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ newPassword: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Reset"
              primary={true}
              style={style}
              onClick={event => this.handleClickReset(event)}
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

export default ResetPassword;
