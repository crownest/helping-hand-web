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

            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    componentWillMount() {
        if (isAuthentication()) {
            listNeedItem({need: this.props.needId}, (response) => {
                if (response) {
                    if (response.statusCode === HTTP_200_OK) {
                        this.setState({
                            needitems: response.body
                        });
                    }
                }
            });
        }

        retrieveUser((response) => {
            if (response) {
                if (response.statusCode === HTTP_200_OK) {
                    this.setState({
                        user: response.body
                    });
                }
            }
        });
    }

    onChange = (e) => {
        const state = this.state;
        for (let i = 0; i < state.needitems.length; i++) {
            if (state.needitems[i].id === parseInt(e.target.name.split('_')[1])) {
                state.needitems[i].new_remaining = state.needitems[i].remaining - e.target.value;
                break;
            }
        }
        this.setState(state);
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


        this.state.needitems.forEach((item) => {
            if (item.new_remaining && item.new_remaining != item.remaining) {
                let data = {
                    name: item.name,
                    remaining: item.new_remaining,
                    is_fixed: item.is_fixed,
                    need: item.need
                };

                updateNeedItem(item.id, data, (response) => {
                    if (response) {
                        if (response.statusCode === HTTP_200_OK) {
                            this.onReset();
                            this.props.alert.success('Successful!');
                            setTimeout(window.location.reload(), 5000);
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
            }
        })


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
                                            <td>
                                                <input type="text"
                                                       name={"remaining_" + needitem.id}
                                                       value={remaining}
                                                       onChange={this.onChange}/>
                                            </td>
                                            <td>
                                                <span>{needitem.name}</span>
                                            </td>
                                            <td>{needitem.remaining}</td>
                                        </tr>
                                    )}
                                </table>
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