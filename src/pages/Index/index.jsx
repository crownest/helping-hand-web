// Packages
import React, {Component} from 'react';

// Constants
import {language} from 'constants/languageConstants';

// Objects
import Header from 'objects/Header/index'

//Services
import {authLogin} from "../../services/coreServices";

export default class Index extends Component {
    constructor() {
        super();

        document.title = language.trans("Index") + " | Helping Hand";

        this.state = {
            "title": "Helping Hand"
        };
    }

    componentDidMount() {
        const data = {
            email: "crownest@unicrow.com",
            password: "helping"
        }
        authLogin(data, (response) => {
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
