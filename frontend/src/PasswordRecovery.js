import React from 'react';
import ReactDOM from 'react-dom';
import ResetPassword from './ResetPassword';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

class PasswordRecovery extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            code:''
        };
    }
    
    handleRecoverClick(event){
        var element = <ResetPassword />;
        var container = document.getElementById('root');
        ReactDOM.render(element, container);
    }
    
    
    render(){
        return(
            <div>
                <MuiThemeProvider>
                    <div>
                        <TextField 
                        hintText="Enter email address"
                        floatingLabelText="Email"
                        onChange={(event, newValue) => this.setState({email:newValue})} 
                        />
                        <br/>
                        <RaisedButton label="Recover" primary={true} style={style} onClick={(event) => this.handleRecoverClick(event)}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
    
}

const style = {
    margin:15
};

export default PasswordRecovery;