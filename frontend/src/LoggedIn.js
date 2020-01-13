import React from 'react'
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

class LoggedIn extends React.Component {
    constructor(props) {
        super(props);
        this.signOutUser = props.signOutUser;
    }

    render() {
        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon color='white' /></IconButton>}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Sign out" onClick={this.props.signOutUser} />
            </IconMenu>
        );
    }
}

export default LoggedIn;
