// Packages
import React, {Component} from 'react';

// Constants
import {language} from '../../constants/languageConstants';

// Components
import RightNav from '../../components/RightNav/index';
import LeftNav from '../../components/LeftNav/index';

// Objects
import Header from '../../objects/Header/index';
import Footer from '../../objects/Footer/index';
import Map from '../../objects/Map/index';
import SettingsPage from '../../objects/Settings/index';

export default class Settings extends Component {

    constructor(props) {
        super(props);

        document.title = language.trans("Index") + " | Helping Hand";

        this.state = {
            "title": "Helping Hand",
            rightNavIsOpen: false
        };
        this.toggleRightNav = this.toggleRightNav.bind(this);
    }

    toggleRightNav() {
        this.setState({
            rightNavIsOpen: !this.state.rightNavIsOpen
        });
    }

    render() {
        const {title} = this.state;

        return (
            <div id="settings-page">
                <Header title={title} rightNowHandler={this.toggleRightNav} />
                <SettingsPage />
                <Footer />
            </div>
        );
    }
}
