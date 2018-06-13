// Packages
import React, {Component} from 'react';

// Constants
import {language} from 'constants/languageConstants';

// Objects
import Header from 'objects/Header/index'

//Services
import {listCategory} from "../../services/categoryServices";
import {authLogin} from "../../services/coreServices";
import {setAuthInformations} from "../../services/baseServices";

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
        };

        authLogin(data, (response) => {
            setAuthInformations("2fbcaecf50b85082ed27f401aa60ba5c57c45e82", 1);
           console.log(response);
        });

        listCategory(response => {
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
