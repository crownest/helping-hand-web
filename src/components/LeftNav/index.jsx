// Packages
import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class LeftNav extends Component {
    constructor() {
        super();

        this.state = {
            isMenuOpen: false
        };
    }

    render() {
        const isActiveClass = this.state.isMenuOpen ? 'open': '';
        return (
            <div className={"left-menu " + isActiveClass}>
                <Link to="#" className="open-btn" onClick={() => this.setState({isMenuOpen: !this.state.isMenuOpen})}>Open/Close</Link>
                <span className="check"><img src="/images/icon/check.png" alt=""/>180 needs are solved</span>
                <Link to="/need" className="add"><img src="/images/icon/add.png" alt=""/>Add a need</Link>
                <span className="wait"><img src="/images/icon/refresh.png" alt=""/>210 needs are waiting</span>
            </div>
        );
    }
}

