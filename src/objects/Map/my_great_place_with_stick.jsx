import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    greatPlaceStyle,
    greatPlaceCircleStyle, greatPlaceCircleStyleHover,
    greatPlaceStickStyle, greatPlaceStickStyleHover, greatPlaceStickStyleShadow
} from './my_great_place_with_hover_styles';

export default class MyGreatPlaceWithStick extends Component {
    static propTypes = {
        // GoogleMap pass $hover props to hovered components
        // to detect hover it uses internal mechanism
        $hover: PropTypes.bool,
        text: PropTypes.string,
        zIndex: PropTypes.number
    };
    static defaultProps = {};

    render() {
        const {text, zIndex} = this.props;

        const style = {
            ...greatPlaceStyle,
            zIndex: this.props.$hover ? 1000 : zIndex
        };

        const circleStyle = this.props.$hover ? greatPlaceCircleStyleHover : greatPlaceCircleStyle;
        const stickStyle = this.props.$hover ? greatPlaceStickStyleHover : greatPlaceStickStyle;

        return (
            <div style={style}>
                <div style={greatPlaceStickStyleShadow}/>
                <div style={circleStyle}>
                    {text}
                </div>
                <div style={stickStyle}/>
            </div>
        );
    }
}