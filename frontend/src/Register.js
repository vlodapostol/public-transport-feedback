import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import axios from 'axios';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:''
        };
    }
    
    handleClickRegister(event){
        var apiUrl = "http://localhost:3001/api";
        var payload = {
            "username": this.state.username,
            "email": this.state.email,
            "password":this.state.password
        };
        
        axios.post(apiUrl+'/register',payload)
        .then((response) => {
            console.log(response);
            if(response.data.code == 200){
                console.log("registered");
            }
            else{
                console.log("error on registration"+response.message);
            }
        })
    }
    
    render(){
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
           <RaisedButton label="Register" primary={true} style={style} onClick={(event) => this.handleClickRegister(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
    margin:15
};

export default Register;