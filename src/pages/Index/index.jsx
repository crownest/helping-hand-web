// Packages
import React, {Component} from 'react';

// Constants
import {language} from 'constants/languageConstants';

// Objects
import Header from 'objects/Header/index'


export default class Index extends Component {
    constructor() {
        super();

        document.title = language.trans("Index") + " | Helping Hand";

        this.state = {
            "title": "Helping Hand"
        };
    }


    render() {
        const {title} = this.state;

        return (
            <div id="index-page">
                <Header title={title}/>
            </div>
        );
    }
}
