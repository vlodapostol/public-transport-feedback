import React from 'react';
import axios from 'axios';

class AddFeedback extends React.Component {
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

        axios.post('http://3.133.100.81:3001/api/feedback', feedback)
            .then(res => {
                this.props.onFeedbackAdded(feedback);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <input type="text"
                       onChange={this.handleChangeStartingPoint}
                       value={this.state.startingPoint} />
                <input type="text"
                       onChange={this.handleChangeDestinationPoint}
                       value={this.state.destinationPoint} />
                <select
                        value={this.state.transportType}
                        onChange={this.handleChangeTransportType} >
                        <option>BUS</option>
                        <option>TRAM</option>
                        <option>METRO</option>
                </select>
                <input type="time"
                       onChange={this.handleChangeDepartureHour}
                       value={this.state.departureHour} />
                <input type="time"
                       onChange={this.handleChangeTripDuration}
                       value={this.state.tripDuration} />
                <select
                        value={this.state.crowdednessLevel}
                        onChange={this.handleChangeCrowdednessLevel} >
                        <option>LOW</option>
                        <option>MEDIUM</option>
                        <option>HIGH</option>
                </select>
                 <input type="text"
                       onChange={this.handleChangeObservations}
                       value={this.state.observations} />
                <select
                        value={this.state.satisfactionLevel}
                        onChange={this.handleChangeSatisfactionLevel} >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                </select>

                <button onClick={this.addFeedback}>Add feedback</button>
            </div>
        );
    }
}

export default AddFeedback;
