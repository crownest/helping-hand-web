// Packages
import React, {Component} from 'react';
import {withAlert} from 'react-alert';

// Actions
import {
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST
} from "../../constants/serviceConstants";

// Services
import {updateUser} from "../../services/userServices";


class SettingsPage extends Component {
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
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    setData = (data) => {
        this.setState({
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name
        });
    };

    setErrors = (errors) => {
        this.setState({
            errors: errors
        });

        if (errors.non_field_errors) {
            this.props.alert.error(errors.non_field_errors.join("<br>"));
        }
    };

    onReset = (e) => {
        this.setState({
            email: "",
            first_name: "",
            last_name: "",
            errors: {}
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        updateUser(this.state, (response) => {
            if (response) {
                if (response.statusCode === HTTP_200_OK) {
                    this.onReset();
                    this.setData(response.body);
                    this.props.alert.success('Your information was changed successfully!')
                } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
                    this.setErrors(response.body);
                } else {
                    this.onReset();
                    this.props.alert.error('An error has occured and try again later.');
                }
            } else {
                this.onReset();
                this.props.alert.error('An error has occured and try again later.');
            }
        });
    };

    render() {
        const {email, first_name, last_name} = this.state;

        return (
            <form className="account-settings"
                  onSubmit={this.onSubmit}
                  onReset={this.onReset}>
                <h3><span>Account Settings</span></h3>
                <div className="form-item">
                    <label>E-mail</label>
                    <span className="error-message">{this.state.errors.email}</span>
                    <input type="email"
                           name="email"
                           value={email}
                           onChange={this.onChange}/>
                </div>
                <div className="form-item">
                    <label>First name</label>
                    <span className="error-message">{this.state.errors.first_name}</span>
                    <input type="text"
                           name="first_name"
                           value={first_name}
                           onChange={this.onChange}/>
                </div>
                <div className="form-item">
                    <label>Last name</label>
                    <span className="error-message">{this.state.errors.last_name}</span>
                    <input type="text"
                           name="last_name"
                           value={last_name}
                           onChange={this.onChange}/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn full">Save</button>
                </div>
            </form>
        );
    }
}

export default withAlert(SettingsPage);