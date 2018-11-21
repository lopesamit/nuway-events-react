import React, { Component } from 'react';


class Event extends Component {
    constructor(props) {
      super(props)
      this.state = {
        events: []
      }
     
    }
  
    componentDidMount(){
    }
  
  
    render() {
        const event = this.props.location.state
        return(
            <div className="constainer text-center">
                <h3>Title : {event.title}</h3>
                <p> Description : {event.description}</p>
                <p> Start date : {event.start_date}</p>
                <p> End Date : {event.end_date}</p>
                <p> Host : {event.host}</p>
                <p> Location : {event.location}</p>
            </div>
        )
    }
  }
  
  export default Event;
  