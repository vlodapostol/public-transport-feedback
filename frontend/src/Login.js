import React from 'react';
import { Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            toRegister:false
        }
    }
    
    handleLoginClick(event){
        var apiUrl = "http://localhost:3001/api";
        var payload = {
            "username":this.state.username,
            "password":this.state.password
        }
        axios.post(apiUrl+"/login", payload)
        .then(function (response){
            console.log(response);
            if(response.data.code == 200){
                console.log("Login successful");
                return <Redirect to='/' />
            }
            else{
                console.log("Login error: "+response.message);
            }
        })
        
    }
    
    handleRegisterClick(event){
        console.log('awadwda')
        //  return  <Redirect  to="/register" />
        this.setState = ({toRegister:true});
    }
    
    render() {
        if(this.state.toRegister===true){
            return <Redirect to='/register' />
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
                </div>
            </MuiThemeProvider>
        </div>
        );
    }
}

    const style = {
        margin:15
    };

export default Login;