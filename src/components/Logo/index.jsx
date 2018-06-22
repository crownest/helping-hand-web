// Packages
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RetinaImage from 'react-retina-image';

export default class Logo extends Component {
    render() {
        const {url, color} = this.props;

        if (url) {
            return (
                <div className="logo">
                    <Link to={url}>
                        {color === "white"
                            ? <RetinaImage src={[
                                '/images/logo/logo-white.png',
                                '/images/logo/logo-white@2x.png',
                                '/images/logo/logo-white@3x.png'
                            ]}/>
                            : <RetinaImage src={[
                                '/images/logo/logo-green.png',
                                '/images/logo/logo-green@2x.png',
                                '/images/logo/logo-green@3x.png'
                            ]}/>
                        }
                    </Link>
                </div>
            );
        } else {
            return (
                <div className="logo">
                    {color === "white"
                        ? <RetinaImage src={[
                            '/images/logo/logo-white.png',
                            '/images/logo/logo-white@2x.png',
                            '/images/logo/logo-white@3x.png'
                        ]}/>
                        : <RetinaImage src={[
                            '/images/logo/logo-green.png',
                            '/images/logo/logo-green@2x.png',
                            '/images/logo/logo-green@3x.png'
                        ]}/>
                    }
                </div>
            );
        }
    }
}


Logo.defaultProps = {
    url: "",
    color: "green"
};
