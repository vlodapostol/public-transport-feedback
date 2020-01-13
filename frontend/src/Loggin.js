import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import { Redirect } from 'react-router-dom';

class Loggin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toLogIn: false,
            loggedIn: props.loggedIn
        }
        this.onUsernameChange = props.onUsernameChange;
    }

    static muiName = 'FlatButton';

    render() {
        if (this.state.toLogIn) {
            return <Redirect to={
        {
          pathname: '/login',
          state: { 'loggedIn': this.state.loggedIn },
          userNameCallback: this.onUsernameChange
        }
      }/>;
        }

        return (
            <FlatButton {...this.props} label="Login" onClick={(ev) => {
        this.setState({toLogIn: true})
      }} />
        );
    }
}

export default Loggin;
