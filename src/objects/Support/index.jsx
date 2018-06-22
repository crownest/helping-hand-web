// Packages
import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

// Actions
import {HTTP_200_OK, HTTP_400_BAD_REQUEST} from "../../constants/serviceConstants";

// Services
import {listNeedItem, updateNeedItem} from "../../services/needitemServices";
import {retrieveUser} from "../../services/userServices";
import {isAuthentication} from "../../services/baseServices";
import {withAlert} from "react-alert";


class SupportMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // To list the Need Items
            user: {},
            needitems: [],

            // To update the Need Items
            name: props.name,
            remaining: props.remaining,
            is_fixed: props.is_fixed,
            need: props.need,
            errors: {}
        };

        this.setNeedItems = this.setNeedItems.bind(this);
        this.setUser = this.setUser.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setData = this.setData.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    componentWillMount() {
        if (isAuthentication()) {
            listNeedItem((response) => {
                if (response) {
                    if (response.statusCode === HTTP_200_OK) {
                        this.setNeedItems(response.body);
                    }
                }
            });
        }

        retrieveUser((response) => {
            if (response) {
                if (response.statusCode === HTTP_200_OK) {
                    this.setUser(response.body);
                }
            }
        })
    }

    setNeedItems = (needitems) => {
        this.setState({
            needitems: needitems
        });
    };

    setUser = (user) => {
        this.setState({
            user: user
        });
    };

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    setData = (data) => {
        this.setState({
            name: data.name,
            remaining: data.remaining,
            is_fixed: data.is_fixed,
            need: data.need
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
            name: "",
            remaining: "",
            is_fixed: "",
            need: "",
            errors: {}
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        let data = {
            name: this.state.name,
            remaining: this.state.remaining,
            is_fixed: this.state.is_fixed,
            need: this.state.need
        };

        updateNeedItem(this.props.id, data, (response) => {
            if (response) {
                if (response.statusCode === HTTP_200_OK) {
                    this.onReset();
                    this.setData(response.body);
                    this.props.alert.success('Successful!');
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
        const {remaining} = this.state;

        if (!isAuthentication()) {
            return (
                <Redirect to="/"/>
            );
        } else {
            return (
                <div className="support-menu">
                    <form onSubmit={this.onSubmit} onReset={this.onReset}>
                        <div className="form-area">
                            <div className="form-item">
                                <label>Support</label>
                                <p>Fill in the amount of items you want to give.</p>
                            </div>
                            <div className="form-item">
                                <table>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Items</th>
                                        <th>Remaining</th>
                                    </tr>
                                    {this.state.needitems.map(needitem =>
                                        <tr key={needitem.id}>
                                            <td><input type="text"
                                                       value={remaining}
                                                       onChange={this.onChange}/></td>
                                            <td>
                                                <span>{needitem.name}</span>
                                            </td>
                                            <td>{needitem.remaining}</td>
                                        </tr>
                                    )}
                                </table>
                            </div>
                            <div className="form-item">
                                <label>Support date</label>
                                <input type="text" name="end_date"/>
                            </div>
                            <div className="form-item">
                                <button type="submit" className="btn full">Support</button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default withAlert(SupportMenu);