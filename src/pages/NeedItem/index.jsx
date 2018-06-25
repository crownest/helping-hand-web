// Packages
import React, {Component} from 'react';

// Constants
import {language} from 'constants/languageConstants';

// Components
import RightNav from 'components/RightNav/index';
import LeftNav from 'components/LeftNav/index';

// Objects
import Header from 'objects/Header/index';
import Footer from 'objects/Footer/index';
import Map from 'objects/Map/index';
import NeedItemMenu from 'objects/NeedItem/index';
import {listNeed, retrieveNeed} from "../../services/needServices";
import {HTTP_200_OK} from "../../constants/serviceConstants";

export default class NeedItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Helping Hand",
            rightNavIsOpen: false,
            need: {}
        };
        this.toggleRightNav = this.toggleRightNav.bind(this);
    }

    toggleRightNav() {
        this.setState({
            rightNavIsOpen: !this.state.rightNavIsOpen
        });
    }


    componentDidMount() {
        //document.title = language.trans("Index") + " | Helping Hand";

        retrieveNeed(this.props.match.params.id, (response) => {
            if (response) {
                if (response.statusCode === HTTP_200_OK) {
                    this.setState({
                        need: response.body
                    })
                }
            }
        });
    }

    render() {
        const {title, need} = this.state;
        let theNeed = {
            title: need.title,
            id: need.id
        }
        return (
            <div id="needitem-page">
                <Header title={title} rightNowHandler={this.toggleRightNav}/>
                <LeftNav/>
                <RightNav isOpen={this.state.rightNavIsOpen}/>
                <Map/>

                <NeedItemMenu need={theNeed}/>

                <Footer/>
            </div>
        );
    }
}
