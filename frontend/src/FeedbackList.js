import React from 'react';

class FeedbackList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            feedbacks: []
        };
        
    }
    
    componentDidUpdate = (prevProps) => {
        if(prevProps.feedbacks.length !== this.props.feedbacks.length) {
            this.setState({
                feedbacks: this.props.feedbacks
            })
        }
    }

                                                                            
    render() {
        const feedbacks = this.state.feedbacks.map((feedback, index) => 
            <div key={index}>
                <span>{feedback.id} </span>
                <span>{feedback.startingPoint} </span>
                <span>{feedback.destinationPoint} </span>
                <span>{feedback.transportType} </span>
                <span>{feedback.departureHour} </span>
                <span>{feedback.tripDuration} </span>
                <span>{feedback.crowdednessLevel} </span>
                <span>{feedback.observations} </span>
                <span>{feedback.satisfactionLevel} </span>
            </div>
        )
        
        return (
            <div>
                {feedbacks}
            </div>
            );
    }
}

export default FeedbackList;