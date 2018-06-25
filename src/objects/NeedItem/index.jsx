// Packages
import React, {Component} from 'react';
import {withAlert} from 'react-alert';

// Actions
import {
    HTTP_200_OK,
    HTTP_201_CREATED, HTTP_400_BAD_REQUEST
} from "../../constants/serviceConstants";

// Services
import {createNeedItem} from "../../services/needitemServices";

class NeedItemMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // To create Need Item
            name: "",
            remaining: "",
            is_fixed: false,
            need: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.onReset = this.onReset.bind(this);
        this.setNeed = this.setNeed.bind(this);
    }

    componentDidMount() {
        document.title = "Need Items | Helping Hand";
    }

    setNeed = (need) => {
        this.setState({
            need: need
        });
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        console.log(e.target.name);
    }

    setErrors = (errors) => {
        this.setState({
            errors: errors
        });
    }

    setRedirect = (id) => {
        this.setState({
            redirect: true,
        });
    }

    onReset = (e) => {
        this.setState({
            name: "",
            remaining: "",
            is_fixed: false,
            need: {},
            errors: {}
        });
    }


    onSubmit = (e) => {
        e.preventDefault();

        var data = {
            name: this.state.name,
            remaining: this.state.remaining,
            is_fixed: this.state.is_fixed,
            need: this.props.need.id,
        }

        createNeedItem(data, (response) => {
            if (response) {
                if (response.statusCode === HTTP_201_CREATED) {
                    this.onReset();
                    this.props.alert.success("Successfully created a need item!");
                    this.setRedirect(response.body.id);
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

    render() {
        const {name, remaining} = this.state;
        const {need} = this.props;
        return (
            <div className="needitem-menu">
                <h1>{need.title}</h1>
                <form onSubmit={this.onSubmit} onReset={this.onReset}>
                    <ul>
                        <li className="form-item">
                            <label>Item Name</label>
                            <input type="text" name='name' value={name} onChange={this.onChange}/>

                        </li>
                        <li className="form-item">
                            <label>Remaining</label>
                            <input type="text" name='remaining' value={remaining} onChange={this.onChange}/>
                        </li>
                        <li className="form-item">
                            <button type="submit" className="btn full">Add</button>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}

export default withAlert(NeedItemMenu);