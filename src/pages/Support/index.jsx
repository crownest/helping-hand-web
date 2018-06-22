// Packages
import React, {Component} from 'react';

// Components
import RightNav from '../../components/RightNav/index';
import LeftNav from '../../components/LeftNav/index';

// Objects
import Header from '../../objects/Header/index';
import Footer from '../../objects/Footer/index';
import Map from '../../objects/Map/index';
import SupportMenu from '../../objects/Support/index';

export default class Support extends Component {

    constructor(props) {
        super(props);

        document.title = "Support | Helping Hand";

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
            <div id="support-page">
                <Header title={title} rightNowHandler={this.toggleRightNav}/>
                <LeftNav/>
                <Map/>
                <SupportMenu/>
                <RightNav/>
                <Footer/>
            </div>
        );
    }
}
