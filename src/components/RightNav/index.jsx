// Packages
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Constants
import {HTTP_200_OK, HTTP_400_BAD_REQUEST} from "../../constants/serviceConstants";

// Services
import {listNeed} from "../../services/needServices";
import {isAuthentication} from "../../services/baseServices";

export default class RightNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            needs: [],
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
        const isRightActiveClass = this.props.isOpen ? 'open' : '';
        const {needs} = this.state;
        return (
            <div className={"right-menu " + isRightActiveClass}>
                <div className="search-area">
                    <input type="text" name="search" placeholder="Category, location, need search"/>
                    <button type="submit"><i className="material-icons">search</i></button>
                </div>
                <ul>
                    {this.state.needs.map(need =>
                        <li>
                            <Link to="#">
                                <div className="img"><img src="/images/temp/img01.jpg" alt=""/></div>
                                <div className="text">
                                    <h6><img src="/images/icon/durum-mini-1.png" alt=""/><span>{need.title}</span>
                                    </h6>
                                    <p>{need.description}</p>
                                    <span className="count">21 people wanted to help.</span>
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
                <Link to="#" className="btn full">Show other need</Link>
            </div>
        );
    }
}