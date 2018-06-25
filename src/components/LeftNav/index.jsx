// Packages
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Services
import {listNeed} from "../../services/needServices";
import {HTTP_200_OK} from "../../constants/serviceConstants";
import {isAuthentication} from "../../services/baseServices";

export default class LeftNav extends Component {
    constructor() {
        super();

        this.state = {
            isMenuOpen: false,
            needs: []
        };

        this.setNeeds = this.setNeeds.bind(this);
    }

    componentWillMount() {
        if (isAuthentication()) {
            listNeed((response) => {
                if (response) {
                    if (response.statusCode === HTTP_200_OK) {
                        this.setNeeds(response.body);
                    }
                }
            });
        }
    }

    setNeeds = (needs) => {
        this.setState({
            needs: needs
        });
    }


    render() {
        const isActiveClass = this.state.isMenuOpen ? 'open' : '';
        const {needs} = this.state;
        let isFixedCount = 0;
        needs.forEach((item) => {
            if (item.is_fixed) {
                isFixedCount += 1;
            }
        });
        return (
            <div className={"left-menu " + isActiveClass}>
                <Link to="#" className="open-btn"
                      onClick={() => this.setState({isMenuOpen: !this.state.isMenuOpen})}>Open/Close</Link>
                <span className="check"><img src="/images/icon/check.png" alt=""/>{isFixedCount} needs are solved</span>
                <Link to="/need" className="add"><img src="/images/icon/add.png" alt=""/>Add a need</Link>
                <span className="wait"><img src="/images/icon/refresh.png" alt=""/>{needs.length - isFixedCount} needs are waiting</span>
            </div>
        );
    }
}

