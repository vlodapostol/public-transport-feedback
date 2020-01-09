import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from "axios"; 

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';

var Rating = require('react-rating');

class CreateFeedback extends React.Component{
    
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
        this.setState({value24: date});  
    };
    
    render(){
        return(
            <div>
            <MuiThemeProvider>
            <div>
                <AppBar 
                    title='Add a Feedback' showMenuIconButton={false} />
                <TextField hintText="Add Starting Point" />
                <TextField hintText="Add Destination Point" />
                <SelectField floatingLabelText="Add Transport Type" 
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
                <TextField hintText="Add Trip Duration" />
                <SelectField 
                floatingLabelText="Add Crowdedness Level" 
                value = {this.state.value} 
                onChange={this.handleChange} >
                
                <MenuItem value={1} primaryText="LOW" />
                <MenuItem value={2} primaryText="MEDIUM" />
                <MenuItem value={3} primaryText="HIGH" />
                </SelectField>
                <TextField hintText="Add Observations" />
                <Rating 
                start={1} 
                stop={3} 
                step={1} 
                initialRating={0} >
                {/* TO DO: incearca sa downloadezi imaginile, salvezi in proiect */}
                <img src="https://img.icons8.com/dusk/64/000000/sad.png"/>, 
                <img src="https://img.icons8.com/dusk/64/000000/neutral-emoticon.png"/>, 
                <img src="https://img.icons8.com/dusk/64/000000/happy.png"/> ]} 

                </Rating>
            </div>
            </MuiThemeProvider>
            </div>
        );
    }
}

export default CreateFeedback;