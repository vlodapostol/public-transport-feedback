import React from 'react';
import ReactDOM from 'react-dom';
import ResetPassword from './ResetPassword';
import {Redirect, BrowserRouter} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

class PasswordRecovery extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            code:'',
            recoverClicked:false
        };
    }
    
    // handleRecoverClick(event){
    //     var element =<BrowserRouter><div> <ResetPassword /></div> </BrowserRouter>;
    //     var container = document.getElementById('app');
    //     ReactDOM.render(element, container);
    // }
    
    
    render(){
        
        if(this.state.recoverClicked===true){
            return <ResetPassword/>
        }
        
        return(
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
                        <RaisedButton label="Recover" primary={true} style={style} onClick={(event) => this.setState({recoverClicked:true})}
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