// Packages
import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

// Actions
import MyGreatPlaceWithStick from './my_great_place_with_stick';
import {K_CIRCLE_SIZE, K_STICK_SIZE} from "./my_great_place_with_hover_styles";

// Services
import {listNeed} from "../../services/needServices";
import {isAuthentication} from "../../services/baseServices";
import {HTTP_200_OK} from "../../constants/serviceConstants";

export default class Map extends Component {
    constructor(props) {
        super(props);

        // Initiate the default state.
        this.state = {
            needs: [],
        };
    };

    componentWillMount() {
        if (isAuthentication()) {
            listNeed((response) => {
                if (response) {
                    if (response.statusCode === HTTP_200_OK) {
                        this.setState({
                            needs: response.body
                        });
                    }
                }
            });
        }
    };

// Set the default properties of the map marker.
    static defaultProps = {
        center: {lat: 51.909490, lng: 6.384903},
        zoom: 8,
        greatPlaceCoords: {lat: 50.909490, lng: 6.384903},
    };

// Determine the distance of the marker to the mouse pointer.
    _distanceToMouse = (markerPos, mousePos, markerProps) => {
        const x = markerPos.x;
        const y = markerPos.y - K_STICK_SIZE - K_CIRCLE_SIZE / 2;

        const distanceKoef = markerProps.text !== 'A' ? 1.5 : 1;
        return distanceKoef * Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
    };


    render() {
        return (
            <div className='google-map' style={{height: '100vh', width: '100%'}}>
                {/*Google Map React component call with its properties*/}
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyClAqaUdtOKdG6zyT8wSNkuBhm1iOcfaVw'}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    hoverDistance={K_CIRCLE_SIZE / 2}
                    distanceToMouse={this._distanceToMouse}>
                    {this.state.needs.map(need =>
                        <MyGreatPlaceWithStick key={need.id} lat={need.lat} lng={need.long} zIndex={need.id.length}/>
                    )}
                </GoogleMapReact>
            </div>
        )
    };
}