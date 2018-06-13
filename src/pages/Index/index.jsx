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


export default class Index extends Component {

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
            <div id="index-page">
                <Header title={title} rightNowHandler={this.toggleRightNav}/>
                
                <LeftNav />
                
                <RightNav isOpen={this.state.rightNavIsOpen}/>
                
                <Footer />
            </div>
        );
    }
}
