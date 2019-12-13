import React, { Component } from 'react';
import AddFeedback from './AddFeedback';
import FeedbackList from './FeedbackList';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      feedbacks: []
    };
  }
  
  onFeedbackAdded = (feedback) => {
    const newFeedbacks = this.state.feedbacks;
    newFeedbacks.push(feedback);
    this.setState({
      feedbacks: newFeedbacks
    });
  }
  
  componentDidMount = () => {
    axios.get('http://3.133.100.81:3001/api/feedback')
    .then(feedbacks => {
      this.setState({
        feedbacks: feedbacks.data
      })
    })
  }
  
  
  render() {
    return (
      <div className="App">
          <AddFeedback onFeedbackAdded={this.onFeedbackAdded}/>
          <FeedbackList feedbacks={this.state.feedbacks}/>
      </div>
    );
  }
}

export default App;
