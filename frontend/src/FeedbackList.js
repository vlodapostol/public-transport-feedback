import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class FeedbackList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            feedbacks: props.feedbacks
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
                <TableRow>
                    <TableRowColumn><span>{feedback.id}</span></TableRowColumn>
                    <TableRowColumn><span>{feedback.startingPoint}</span></TableRowColumn>
                    <TableRowColumn><span>{feedback.destinationPoint}</span></TableRowColumn>
                    <TableRowColumn><span>{feedback.transportType}</span></TableRowColumn>
                    <TableRowColumn><span>{feedback.departureHour}</span></TableRowColumn>
                    <TableRowColumn><span>{feedback.tripDuration} </span></TableRowColumn>
                    <TableRowColumn><span>{feedback.crowdednessLevel} </span></TableRowColumn>
                    <TableRowColumn><span>{feedback.observations}</span></TableRowColumn>
                    <TableRowColumn><span>{feedback.satisfactionLevel}</span></TableRowColumn>
                </TableRow>
          );
        
        return (
            <div>
            <MuiThemeProvider>
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Starting Point</TableHeaderColumn>
                        <TableHeaderColumn>Destination Point</TableHeaderColumn>
                        <TableHeaderColumn>Transport Type</TableHeaderColumn>
                        <TableHeaderColumn>Departure Hour</TableHeaderColumn>
                        <TableHeaderColumn>Trip Duration</TableHeaderColumn>
                        <TableHeaderColumn>Crowdedness Level</TableHeaderColumn>
                        <TableHeaderColumn>Observations</TableHeaderColumn>
                        <TableHeaderColumn>Satisfaction Level</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {feedbacks}
                </TableBody>
                </Table>
          </MuiThemeProvider>
          </div>
            );
    }
}

export default FeedbackList;