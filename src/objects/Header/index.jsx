// Packages
import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    handleClick = e => {
        e.preventDefault();
        this.props.rightNowHandler();
    }
    render() {
        return (
            <header>
                <div className="container">
                    <Link to="#" className="logo"><img src="/images/logo/logo.png" alt=""/></Link>
                    <div className="head-form">
                        <div className="input"><input type="text" placeholder="Search words"/></div>
                        <div className="select-box">
                            <select>
                                <option>Location</option>
                                <option>Option1</option>
                                <option>Option2</option>
                                <option>Option3</option>
                                <option>Option4</option>
                                <option>Option5</option>
                            </select>
                        </div>
                    </div>
                    <Link to="#" className="menu-btn"
                          onClick={this.handleClick}><i
                        className="material-icons">menu</i></Link>
                    <div className="head-nav">
                        <ul className="login-signup">
                            <li><Link to="#register" className="register-btn">Sign up</Link></li>
                            <li><Link to="#login" className="login-btn">Login</Link></li>
                        </ul>

                        <div className="user-nav hide">
                            <span className="username">@johndoe <i className="material-icons">arrow_drop_down</i></span>
                            <ul>
                                <li><Link to="#">Supports</Link></li>
                                <li><Link to="#">Needs</Link></li>
                                <li><Link to="#">Settings</Link></li>
                                <li><Link to="#">Exit</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </header>

        );
    }
}
