import React, { Component } from 'react';
import {fullWhite} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import FeedbackList from './FeedbackList';
import { Redirect } from 'react-router-dom';

class SearchedResult extends React.Component {
    
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            feedbackList: props.feedbackList,
            keywords: props.keywords,
            toLanding:false
        };
    }
    
    render() {
        const title = "Filtered search by '" + this.state.keywords + "'";
        
        if(this.state.toLanding===true){
            return <Redirect to='/' />;
        }
        
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar 
                    title={title}
                    iconElementLeft={<ArrowBack color='white' textAlign= 'center'/>}
                    onLeftIconButtonClick= {(event) => {this.setState({toLanding:true})}}
                    />
                </MuiThemeProvider>
                <FeedbackList feedbacks={this.props.feedbackList} />
            </div>
            );
    }
}
export default SearchedResult;