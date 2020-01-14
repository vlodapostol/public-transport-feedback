import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from "axios";

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

import { Redirect } from 'react-router-dom';

var Rating = require('react-rating');

const ip = "52.59.237.162";

class CreateFeedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startingPoint: '',
            destinationPoint: '',
            transportType: '',
            departureHour: 0,
            tripDuration: 0,
            crowdednessLevel: '',
            observations: '',
            satisfactionLevel: 0,
            author: this.props.location.state.username,
            rawDate: 0,
            redirectToDashboard: false
        };
        this.onFeedbackAdded = this.props.location.feedbackAddedHandler;
    }

    handleChangeDepartureHour = (ev, date) => {
        let mdate = new Date(date);
        let fdate = mdate.getHours() + ':' + mdate.getMinutes();

        this.setState({
            departureHour: fdate,
            rawDate: date
        });
    }

    // adds feedback
    addFeedback = () => {
        const feedback = this.state;
        axios.post('http://' + ip + ':3001/api/user/' + this.state.author + '/feedback', feedback)
            .then(res => {
                this.onFeedbackAdded(feedback);
                console.log('feedback added succesfully');
                this.setState({ redirectToDashboard: true });
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    render() {
        if (this.state.redirectToDashboard) {
            return <Redirect to='/' />
        }

        return (
            <div>
            <MuiThemeProvider>
            <div>
                <AppBar 
                    title='Add a Feedback' showMenuIconButton={false} />
                <TextField hintText="Add Starting Point" onChange={(ev, value) => {this.setState({startingPoint: value})}} />
                <br/>
                <TextField hintText="Add Destination Point" onChange={(ev, value) => {this.setState({destinationPoint: value})}} />
                <br/>
                <SelectField 
                hintText="Select Transport Type" 
                value = {this.state.transportType } >
                <MenuItem value={'BUS'} primaryText="BUS" onClick={(ev) => {this.setState({transportType: 'BUS'})}} />
                <MenuItem value={'METRO'} primaryText="METRO" onClick={(ev) => {this.setState({transportType: 'METRO'})}} />
                <MenuItem value={'TRAM'} primaryText="TRAM" onClick={(ev) => {this.setState({transportType: 'TRAM'})}} />
                </SelectField>
                <br/>
                <TimePicker 
                ref='timePicker'
                format="24hr"
                hintText="Add Departure Hour"
                autoOk={true}
                value={this.state.rawDate}
                onChange={this.handleChangeDepartureHour} />
                <br/>
                <TextField hintText="Add Trip Duration" onChange={(ev, value) => {this.setState({tripDuration: value})}} />
                <br/>
                <SelectField 
                hintText="Add Crowdedness Level" 
                value = {this.state.crowdednessLevel} >
                <MenuItem value={'LOW'} primaryText="LOW" onClick={(ev) => {this.setState({crowdednessLevel: 'LOW'})}} />
                <MenuItem value={'MEDIUM'} primaryText="MEDIUM" onClick={(ev) => {this.setState({crowdednessLevel: 'MEDIUM'})}} />
                <MenuItem value={'HIGH'} primaryText="HIGH" onClick={(ev) => {this.setState({crowdednessLevel: 'HIGH'})}} />
                </SelectField>
                <br/>
                <TextField hintText="Add Observations" onChange={(ev, value) => {this.setState({observations: value})}}/>
            </div>
            
            <div style={{margin: '0px 0px 0px -45px'}}>
                <IconButton onClick={(ev) => {this.setState({satisfactionLevel: 1})}} tooltip="Sad" touch={true} tooltipPosition="bottom-right" style={style}>
                    <img src="https://img.icons8.com/dusk/64/000000/sad.png" alt ="Sad"/>
                </IconButton>
                <IconButton onClick={(ev) => {this.setState({satisfactionLevel: 2})}} tooltip="Neutral" touch={true} tooltipPosition="bottom-center" style={style}>
                    <img src="https://img.icons8.com/dusk/64/000000/neutral-emoticon.png" alt ="Neutral"/>
                </IconButton>
                <IconButton onClick={(ev) => {this.setState({satisfactionLevel: 3})}} tooltip="Happy" touch={true} tooltipPosition="bottom-left" style={style}>
                    <img src="https://img.icons8.com/dusk/64/000000/happy.png" alt ="Happy"/>
                </IconButton>
            </div>
            
            <div>
                <RaisedButton label='Add feedback' style={{margin: '10px 0px'}} onClick={this.addFeedback}/>
            </div>
            </MuiThemeProvider>
        </div>
        );
    }
}

const style = {
    margin: 15
};

export default CreateFeedback;
