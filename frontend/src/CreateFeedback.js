import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from "axios";

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import IconButton from 'material-ui/IconButton';

var Rating = require('react-rating');

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
            satisfactionLevel: 0
        };
    }

    handleChangeStartingPoint = (event) => {
        this.setState({
            startingPoint: event.target.value
        });
    }

    handleChangeDestinationPoint = (event) => {
        this.setState({
            destinationPoint: event.target.value
        });
    }

    handleChangeTransportType = (event) => {
        this.setState({
            transportType: event.target.value
        });
    }

    handleChangeDepartureHour = (event) => {
        this.setState({
            departureHour: 0
        });
    }

    handleChangeTripDuration = (event) => {
        this.setState({
            tripDuration: 0
        });
    }

    handleChangeCrowdednessLevel = (event) => {
        this.setState({
            crowdednessLevel: event.target.value
        });
    }

    handleChangeObservations = (event) => {
        this.setState({
            observations: event.target.value
        });
    }

    handleChangeSatisfactionLevel = (event) => {
        this.setState({
            satisfactionLevel: parseInt(event.target.value)
        });
    }

    // adds feedback
    addFeedback = () => {
        const feedback = this.state;

        axios.post('http://3.122.226.49:3001/addFeedback', feedback)
            .then(res => {
                this.props.onFeedbackAdded(feedback);
                console.log('feedback added succesfully');
            })
            .catch(err => {
                console.log(err);
            })
    }


    handleChangeTimePicker24 = (event, date) => {
        this.setState({ value24: date });
    };

    render() {
        return (
            <div>
            <MuiThemeProvider>
            <div>
                <AppBar 
                    title='Add a Feedback' showMenuIconButton={false} />
                <TextField hintText="Add Starting Point" />
                <br/>
                <TextField hintText="Add Destination Point" />
                <br/>
                <SelectField hintText="Select Transport Type" 
                value = {this.state.value } 
                onChange={this.handleChange} >
                
                <MenuItem value={1} primaryText="BUS" />
                <MenuItem value={2} primaryText="METRO" />
                <MenuItem value={3} primaryText="TRAM" />
                </SelectField>
                <br/>
                <TimePicker 
                format="24hr"
                hintText="Add Departure Hour"
                value={this.state.value24}
                onChange={this.handleChangeTimePicker24} />
                <br/>
                <TextField hintText="Add Trip Duration" />
                <br/>
                <SelectField 
                hintText="Add Crowdedness Level" 
                value = {this.state.value} 
                onChange={this.handleChange} >
                
                <MenuItem value={1} primaryText="LOW" />
                <MenuItem value={2} primaryText="MEDIUM" />
                <MenuItem value={3} primaryText="HIGH" />
                </SelectField>
                <br/>
                <TextField hintText="Add Observations" />
            </div>
            
                        <div>
    <IconButton tooltip="Sad" touch={true} tooltipPosition="bottom-right" style={style}>
      <img src="https://img.icons8.com/dusk/64/000000/sad.png" alt ="Sad"/>
    </IconButton>
    <IconButton tooltip="Neutral" touch={true} tooltipPosition="bottom-center" style={style}>
      <img src="https://img.icons8.com/dusk/64/000000/neutral-emoticon.png" alt ="Neutral"/>
    </IconButton>
    <IconButton tooltip="Happy" touch={true} tooltipPosition="bottom-left" style={style}>
      <img src="https://img.icons8.com/dusk/64/000000/happy.png" alt ="Happy"/>
    </IconButton>
   
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
