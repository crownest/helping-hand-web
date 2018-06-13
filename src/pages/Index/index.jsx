// Packages
import React, {Component} from 'react';

// Constants
import {language} from 'constants/languageConstants';

// Objects
import Header from 'objects/Header/index'

//Services
import {listNeed} from "../../services/needServices";

export default class Index extends Component {
    constructor() {
        super();

        document.title = language.trans("Index") + " | Helping Hand";

        this.state = {
            "title": "Helping Hand"
        };
    }

    componentDidMount() {
        listNeed(response => {
            console.log(response);
        });
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
