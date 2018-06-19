// Packages
import React, {Component} from 'react';

// Actions
import {
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST
} from "../../constants/serviceConstants";

// Services
import {updateUser} from "../../services/userServices";
import {setAuthInformations} from "../../services/baseServices";

export default class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            first_name: props.first_name,
            last_name: props.last_name,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setData = this.setData.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    setData = (data) => {
        this.setState({
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name
        });
    }

    setErrors = (errors) => {
        this.setState({
            errors: errors
        });
    }

    onReset = (e) => {
        this.setState({
            email: "",
            first_name: "",
            last_name: "",
            errors: {}
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        updateUser(this.state, (response) => {
            if (response) {
                if (response.statusCode === HTTP_200_OK) {
                    this.onReset();
                    this.setData(response.body);
                } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
                    this.setErrors(response.body);
                } else {
                    this.onReset();
                }
            } else {
                this.onReset();
            }
            console.log(response);
        });
    }

    componentDidMount() {
        const data = {
            email: "crownest@unicrow.com",
            password: "helping"
        }

    }

    render() {
        const {email, first_name, last_name, errors} = this.state;

        return (
            <form className="account-settings" onSubmit={this.onSubmit} onReset={this.onReset}>
                <h3><span>Account Settings</span></h3>
                <div className="form-item">
                    <label>E-mail</label>
                    <input type="email" name="email" value={email} onChange={this.onChange}/>
                </div>
                <div className="form-item">
                    <label>First name</label>
                    <input type="text" name="first_name" value={first_name} onChange={this.onChange}/>
                </div>
                <div className="form-item">
                    <label>Last name</label>
                    <input type="text" name="last_name" value={last_name} onChange={this.onChange}/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn full">Save</button>
                </div>
            </form>
        );
    }
}