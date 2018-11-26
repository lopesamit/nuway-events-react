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
                                <img alt="img" src={item.posterImage} className="img-fluid"></img>
                                <div>
                                    <h5> {moment(item.start_date).format('MMM-DD')}</h5>
                                </div>
                                <div>
                                    <h3>{item.title}</h3>
                                    {/* <p>{item.description}</p> */}
                                </div>
                                {/* <Link to={{ pathname: `/event?${item.title}`, state: item }} className=""> <b>More details</b> </Link> */}
                                <Link to={{ pathname: `/event`, state: item }} className=""> <b>More details</b> </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Landing;
