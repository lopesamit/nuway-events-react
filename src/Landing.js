import React, { Component } from 'react';
import './App.scss';
import { Link } from 'react-router-dom';
import firebase from './firebase'

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
            <div>
                <div className="m-3 row">
                    {this.state.events.map((item, index) => {
                        return (
                            <div className="border col col-lg-3 col-md-4 d-inline-block event-container m-2 p-2" key={index}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <Link to={{ pathname: '/event', state: item }} className=""> <b>More details</b> </Link>

                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Landing;
