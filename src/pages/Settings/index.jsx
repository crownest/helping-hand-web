// Packages
import React, {Component} from 'react';

// Components
import RightNav from 'components/RightNav/index';
import LeftNav from 'components/LeftNav/index';

// Objects
import Header from '../../objects/Header/index';
import Footer from '../../objects/Footer/index';
import SettingsPage from '../../objects/Settings/index';


export default class Settings extends Component {

    constructor(props) {
        super(props);

        document.title = "Settings | Helping Hand";

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
                <Header title={title} rightNowHandler={this.toggleRightNav}/>
                <LeftNav/>
                <RightNav isOpen={this.state.rightNavIsOpen}/>
                <SettingsPage/>
                <Footer/>
            </div>
        );
    }
}
