import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
}
from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class FeedbackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbacks: props.feedbacks
        };
        this.onSelectedRowsChange = props.onSelectedRowsChange;
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.feedbacks.length !== this.props.feedbacks.length) {
            this.setState({
                feedbacks: this.props.feedbacks
            })
        }
    }


    render() {
        let feedbacks = this.state.feedbacks;
        let feedbacks1 = [];
        for (let i = 0; i < feedbacks.length; i++) {
            let currEl = feedbacks[i];
            let satisfactionLevel = '';
            switch (currEl.satisfactionLevel) {
                case 1:
                    satisfactionLevel = 'Sad';
                    break;
                case 2:
                    satisfactionLevel = 'Neutral';
                    break;
                case 3:
                    satisfactionLevel = 'Happy';
                    break;
            }
            feedbacks1.push(
                <TableRow>
                    <TableRowColumn><span>{currEl.author}</span></TableRowColumn>
                    <TableRowColumn><span>{currEl.startingPoint}</span></TableRowColumn>
                    <TableRowColumn><span>{currEl.destinationPoint}</span></TableRowColumn>
                    <TableRowColumn><span>{currEl.transportType}</span></TableRowColumn>
                    <TableRowColumn><span>{currEl.departureHour}</span></TableRowColumn>
                    <TableRowColumn><span>{currEl.tripDuration} </span></TableRowColumn>
                    <TableRowColumn><span>{currEl.crowdednessLevel} </span></TableRowColumn>
                    <TableRowColumn><span>{currEl.observations}</span></TableRowColumn>
                    <TableRowColumn><span>{satisfactionLevel}</span></TableRowColumn>
                </TableRow>
            )
        }

        return (
            <div>
            <MuiThemeProvider>
                <Table ref='table' multiSelectable={true} onRowSelection={(selectedRows) => {
                    this.onSelectedRowsChange(selectedRows)
                    console.log(this.refs.table.props.children[1].props.children[0]);
                }}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Author</TableHeaderColumn>
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
                {feedbacks1}
                </TableBody>
                </Table>
          </MuiThemeProvider>
          </div>
        );
    }
}

export default FeedbackList;
