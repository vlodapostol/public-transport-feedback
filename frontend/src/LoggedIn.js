import React from "react";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";

import axios from "axios";

const ip = "18.184.87.37";

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username
    };
    this.signOutUser = props.signOutUser;
  }

  disableAccount() {
    axios
      .put(`http://${ip}:3001/api/user/${this.state.username}/disable`)
      .then(resp => {
        console.log(resp.message);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon color="white" />
          </IconButton>
        }
        targetOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem
          primaryText="Disable account"
          onClick={() => {
            this.disableAccount();
          }}
        />
        <MenuItem primaryText="Sign out" onClick={this.props.signOutUser} />
      </IconMenu>
    );
  }
}

export default LoggedIn;
