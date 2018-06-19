// Packages
import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';


// Actions
import {
    HTTP_201_CREATED, HTTP_400_BAD_REQUEST
} from "../../constants/serviceConstants";

// Services
import {createNeed} from "../../services/needServices";


export default class NeedMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            title: "",
            description: "",
            address: "",
            end_date: "",
            is_fixed: false,
        };


        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.onReset = this.onReset.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({is_fixed: !this.state.is_fixed});
    }


    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
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
            redirect: false,
            title: "",
            description: "",
            address: "",
            end_date: "",
            is_fixed: false,
            errors: {}
        });
    }


    onSubmit = (e) => {
        e.preventDefault();
        var data = {
            title: this.state.title,
            description: this.state.description,
            address: this.state.address,
            end_date: this.state.end_date,
            is_fixed: this.state.is_fixed
        }

        createNeed(data, (response) => {
            if (response) {
                if (response.statusCode === HTTP_201_CREATED) {
                    this.onReset();
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
        const {redirect, title, description, address, end_date, is_fixed} = this.state
        return (
            <form onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="form-area">
                    <div>
                        <h4>Title</h4>
                    </div>
                    <div>
                        <input type='text' name='title' value={title} onChange={this.onChange}/>
                    </div>
                    <div>
                        <h4>Description</h4>
                    </div>
                    <div>
                        <textarea name='description' value={description} onChange={this.onChange}></textarea>
                    </div>
                    <div>
                        <h4>Address</h4>
                    </div>
                    <div className="form-item">
                        <textarea name='address' value={address} onChange={this.onChange}></textarea>
                    </div>
                    <div>
                        <h4>Ending Date [YYYY-MM-DD]</h4>
                    </div>
                    <div className="form-item">
                        <input type="text" name="end_date" value={end_date} onChange={this.onChange}/>
                    </div>
                    <div>
                        <h4>Fixed?</h4>
                    </div>
                    <div className="form-item">
                        <input type="checkbox" name="is_fixed" onChange={this.onChange}/>
                    </div>
                    <div>
                        <h4>Category</h4>
                    </div>
                    <div className="form-item">
                        <div>
                            <select>
                                <option>Category 1</option>
                                <option>Category 2</option>
                                <option>Category 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-item">
                        <button type="submit" className="btn full">Add</button>
                    </div>
                </div>
            </form>
        );
    }
}