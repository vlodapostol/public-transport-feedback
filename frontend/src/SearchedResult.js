import React, { Component } from 'react';
import {fullWhite} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

class SearchedResult extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            feedbackList: props.feedbackList,
            keywords: props.keywords
        };
    }
    
    /*componentDidUpdate = (prevProps) => {
        if(prevProps.feedbackList.length !== this.props.feedbackList.length) {
            this.setState = ({
                feedbackList:this.props.feedbackList
            })
        }
        
    }*/
    
    
    render() {
        const title = "Filtered search by '" + this.state.keywords + "'";
        
        return (
            <MuiThemeProvider>
                <AppBar 
                title={title}
                iconElementLeft={<ArrowBack />}
                />
            </MuiThemeProvider>
            );
    }
}

export default SearchedResult;