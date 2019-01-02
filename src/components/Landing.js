import React, { Component } from 'react';
import './../App.scss';
import { Link } from 'react-router-dom';
import firebase from '../firebase'
import moment from 'moment'
import { TextField, InputLabel } from '@material-ui/core'

require('firebase/database');
require('dotenv').config()


class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            searchedEvents: [],
            isSearching: false
        }
        this.handleSearch = this.handleSearch.bind(this)
    }

    getEvents(){
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

    componentDidMount() {
       this.getEvents()
    }

    async handleSearch(searchString){
        const events = this.state.events
        var searchedEvents = events.filter((item) => {
            const start_date =  moment(item.start_date).format('MMMM-DD')
            return (
                item.title.toLowerCase().includes(searchString.toLowerCase()) ||
                start_date.toLowerCase().includes(searchString.toLowerCase())
            )
        })
        await this.setState({
            searchedEvents: searchedEvents,
            isSearching: true
        })
    }

    render() {
        return (
            <div className="container">
                <h1 className=""> All Events</h1>
                <div className="text-center">
                    <InputLabel className="d-inline-block mr-3" >Search</InputLabel>
                    <TextField
                        className="d-inline-block "
                        onChange={(event) => this.handleSearch(event.currentTarget.value)}
                    >
                    </TextField>
                </div>
                <div className="m-3 row">
                    {this.state.isSearching ?
                        this.state.searchedEvents.map((item, index) => {
                            return (
                                <Link to={{ pathname: `/event/id=${item.id}/${item.title}`, state: item }}
                                    className="col-12 col-lg-3 col-md-4 d-inline-block event-container p-2" key={index}>
                                    <div className="border p-2 rounded">
                                        <div className="event-image" style={{backgroundImage : `url(${item.posterImage})`}}>
                                        </div>
                                        <div>
                                            <h6 className="text-primary"> {moment(item.start_date).format('MMM-DD')}</h6>
                                        </div>
                                        <div>
                                            <h5 className="text-black-50">{item.title}</h5>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    :
                        this.state.events.map((item, index) => {
                            return (
                                <Link to={{ pathname: `/event/id=${item.id}/${item.title}`, state: item }} 
                                    className="col-12 col-lg-3 col-md-4 d-inline-block event-container p-2" key={index}>
                                    <div className="border p-2 rounded">
                                        <div className="event-image" style={{backgroundImage : `url(${item.posterImage})`}}>
                                        </div>
                                        <div>
                                            <h6 className="text-primary"> {moment(item.start_date).format('MMM-DD')}</h6>
                                        </div>
                                        <div>
                                            <h5 className="text-black-50">{item.title}</h5>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Landing;
