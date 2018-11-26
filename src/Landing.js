import React, { Component } from 'react';
import './App.scss';
import { Link } from 'react-router-dom';
import firebase from './firebase'
import moment from 'moment'

require('firebase/database');
require('dotenv').config()


class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        const ref = firebase.database().ref('events');
        ref.on("value", (snapshot) => {
            if (snapshot.val()) {
                Object.values(snapshot.val()).forEach((item) => {
                    this.setState((prevState, props) => {
                        return { events: [...prevState.events, item] }
                    })
                })
            }
        })
    }


    render() {
        return (
            <div className="container">
                <h1 className="text-center"> All Events</h1>
                <div className="m-3 row">
                    {this.state.events.map((item, index) => {
                        return (
                            <div className="border col-12 col-lg-3 col-md-4 d-inline-block event-container m-2 p-2 mx-auto" key={index}>
                                <div className="event-image" style={{backgroundImage : `url(${item.posterImage})`}}>

                                </div>
                                <div>
                                    <h5> {moment(item.start_date).format('MMM-DD')}</h5>
                                </div>
                                <div>
                                    <h4>{item.title}</h4>
                                    {/* <p>{item.description}</p> */}
                                </div>
                                {/* <Link to={{ pathname: `/event?${item.title}`, state: item }} className=""> <b>More details</b> </Link> */}
                                <Link to={{ pathname: `/event/id=${item.id}/${item.title}`, state: item }} className=""> <b>More details</b> </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Landing;
