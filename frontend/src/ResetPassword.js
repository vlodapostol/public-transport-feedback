import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

class ResetPassword extends React.Component{
    constructor(props){
        super(props);
        this.state={
            code:"",
            newPassword:""
        };
    }
    
    handleResetClick(event){
        
    }
    
    render(){
        return(
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Password Recovery" showMenuIconButton={false}/>
                            <TextField 
                            hintText="Enter received code"
                            floatingLabelText="Code"
                            onChange = {(event,newValue) => this.setState({code:newValue})}
                            />
                            <br/>
                            <TextField 
                            type="password"
                            hintText="Enter a new password"
                            floatingLabelText="New password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                            />
                            <br/>
                            <RaisedButton label="Reset" primary={true} style={style} onClick={(event) => this.handleResetClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>    
        );
    }
}

const style = {
    margin:15
};

export default ResetPassword;