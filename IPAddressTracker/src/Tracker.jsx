import React, { Component } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ReactComponent as MarkerIcon } from './images/icon-location.svg';

import SearchBar from './SearchBar';

import './Tracker.css';

class Tracker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationInfo: {
                ipadrress: '192.212.174.101',
                location: 'Brooklyn, NY 10001',
                timezone: 'UTC-05:00',
                isp: 'SpaceX Starlink',
                lat: '34.0536',
                lon: '-118.084',
            },
        };

        this.GEO_API = 'http://ip-api.com/json/#Search';
    }

    searchIpAddress = async (searchTerm) => {
        const { data } = await axios.get(
            this.GEO_API.replace('#Search', searchTerm)
        );

        this.setState({
            locationInfo: {
                ipadrress: data.query,
                location: `${data.city}, ${data.region} ${data.zip}`,
                timezone: data.timezone,
                isp: data.isp,
                lat: data.lat,
                lon: data.lon,
            },
        });
    };

    componentDidUpdate() {
        this.map.setView(
            [this.state.locationInfo.lat, this.state.locationInfo.lon],
            13
        );

        L.marker([this.state.locationInfo.lat, this.state.locationInfo.lon], {
            icon: L.icon({
                iconUrl: require('./images/icon-location.png'),
                iconSize: [30, 40],
                iconAnchor: [22, 94],
            }),
        }).addTo(this.map);
    }

    componentDidMount() {
        this.map = L.map('map', {
            preferCanvas: true,
            zoomControl: false,
            attributionControl: false,
        }).setView(
            [this.state.locationInfo.lat, this.state.locationInfo.lon],
            13
        );

        L.tileLayer(
            'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
            {
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken:
                    'pk.eyJ1IjoibWFobW91ZGtoYWxsb3VmIiwiYSI6ImNrejg1Mmc5aDBxMnYydWw0dzNlcmVzNTAifQ.7iFwT17am0z_C1qHSxUePw',
            }
        ).addTo(this.map);
    }

    render() {
        return (
            <div className="tracker">
                <div className="header">
                    <h1 className="title">IP Address Tracker</h1>
                    <SearchBar searchIpAddress={this.searchIpAddress} />
                    <div className="info-banner">
                        <ul>
                            <li>
                                <div className="border"></div>
                                <h6>IP ADDRESS</h6>
                                <h2>{this.state.locationInfo.ipadrress}</h2>
                            </li>
                            <li>
                                <div className="border"></div>
                                <h6>LOCATION</h6>
                                <h2>{this.state.locationInfo.location}</h2>
                            </li>
                            <li>
                                <div className="border"></div>
                                <h6>TIMEZONE</h6>
                                <h2>{this.state.locationInfo.timezone}</h2>
                            </li>
                            <li>
                                <div className="border"></div>
                                <h6>ISP</h6>
                                <h2>{this.state.locationInfo.isp}</h2>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="map"></div>
            </div>
        );
    }
}

export default Tracker;
