// Packages
import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class Footer extends Component {
    render() {

        return (
            <footer>
                <div className="container">
                    <ul className="foot-nav">
                        <li><Link to="#">Colors and meanings</Link></li>
                        <li><Link to="#">About</Link></li>
                        <li><Link to="#">How is it working?</Link></li>
                        <li><Link to="#">User agreement</Link></li>
                        <li><Link to="#">Find a contributor</Link></li>
                    </ul>
                    <ul className="foot-nav">
                        <li><Link to="#">Support</Link></li>
                        <li><Link to="#">F.A.Q</Link></li>
                        <li><Link to="#">Contact</Link></li>
                    </ul>

                    <div className="foot-info">
                        <img src="/images/logo/footer-logo.png" alt=""/>
                        <h6>Helping-Hand <Link to="#">info@helpmehand.com</Link></h6>
                        <ul className="social">
                            <li><Link to="#" className="fb">Facebook</Link></li>
                            <li><Link to="#" className="tw">Twitter</Link></li>
                            <li><Link to="#" className="ins">İnstagram</Link></li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }
}
