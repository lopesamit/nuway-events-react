import React, { Component } from 'react';
import moment from 'moment'
import firebase from '../firebase'
require('firebase/database');


class Event extends Component {
    constructor(props) {
      super(props)
      this.state = {
        event: {}
      }
    }
    componentDidMount(){
        const eventId = this.props.match.params.id
        if(!this.props.location.state) {
            const ref = firebase.database().ref('events').orderByChild('id').equalTo(eventId*1);
            ref.on("value", (snapshot) => {
                if (snapshot.val()) {
                    Object.values(snapshot.val()).forEach((item) => {
                        this.setState({
                            event: item
                        })
                    })
                }
            })
        } else {
            this.setState({
                event: this.props.location.state
            })
        }
    }

    render() {
        if( !this.state.event) {
            return null
        }
        const event = this.state.event
        const start_date = moment(event.start_date).format('MMM-D')
        const end_date = moment(event.end_date).format('MMM-D')
        return(
            <div className="event-wrapper p-2 p-md-5">
                <div className="container rounded bg-white p-0">
                    <div className="event-details-wrapper rounded">
                        <img className="d-inline-block col-12 col-md-6 p-0 align-top" alt={event.title} src={event.flyerImage}></img>
                        <div className="d-inline-block col-12 col-md-5">
                            <div>
                                <h4 className="mt-3 text-black-50">{start_date}</h4>
                                <hr></hr>
                                <h3 className="mt-3">{event.title}</h3>
                                <p className="text-black-50"> by {event.host}</p>
                                <p> {event.description}</p>
                                <hr></hr>
                                <p> At {event.location}</p>
                                {start_date === end_date ?
                                    null
                                    :
                                    <p> From {start_date} to {end_date}</p>
                                }
                            </div>
                        </div>
                        
                    </div>
                    <div className="p-2 p-md-5">
                        <h3> Flyer Images</h3>
                        
                        <div id="flyerImages" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                            <img className="d-block w-50 mx-auto" src={event.posterImage} alt="First slide"></img>
                            </div>
                            <div className="carousel-item">
                            <img className="d-block w-50 mx-auto" src={event.posterImage} alt="Second slide"></img>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#flyerImages" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon btn-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#flyerImages" role="button" data-slide="next">
                            <span className="carousel-control-next-icon btn-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  }
  
  export default Event;
  