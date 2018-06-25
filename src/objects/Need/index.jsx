// Packages
import React, {Component} from 'react';
import {withAlert} from 'react-alert';

// Actions
import {
    HTTP_200_OK,
    HTTP_201_CREATED, HTTP_400_BAD_REQUEST
} from "../../constants/serviceConstants";

// Services
import {createNeed} from "../../services/needServices";
import {listCategory} from "../../services/categoryServices";
import {isAuthentication} from "../../services/baseServices";

class NeedMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // To create a need
            redirect: false,
            title: "",
            description: "",
            address: "",
            end_date: "",
            is_fixed: false,
            lat: "",
            long: "",

            // To list the categories
            categories: [],
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    componentWillMount() {
        if (isAuthentication()) {
            listCategory((response) => {
                if (response) {
                    if (response.statusCode === HTTP_200_OK) {
                        this.setState({
                            categories: response.body
                        });
                    }
                }
            });
        }
    };

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        console.log(e.target.name, e.target.value);
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
            redirect: false,
            title: "",
            description: "",
            address: "",
            end_date: "",
            is_fixed: false,
            lat: "",
            long: "",
            errors: {},
            needs: [],
        });
    };


    onSubmit = (e) => {
        e.preventDefault();
        let data = {
            title: this.state.title,
            description: this.state.description,
            address: this.state.address,
            end_date: this.state.end_date,
            is_fixed: this.state.is_fixed,
            lat: this.state.lat,
            long: this.state.long,
            needs: this.state.needs,
            categories: this.state.categories
        };

        createNeed(data, (response) => {
            if (response) {
                if (response.statusCode === HTTP_201_CREATED) {
                    this.onReset();
                    this.props.alert.success('Your need was created successfully!');
                    this.props.history.push(`/need/${response.body.id}`);
                } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
                    this.setErrors(response.body);
                } else {
                    this.onReset();
                    this.props.alert.error('An unexpected error has occurred and try again later');
                }
            } else {
                this.onReset();
            }
        });
    };

    render() {
        const {title, description, address, end_date, lat, long} = this.state;
        return (
            <div className="need-menu">
                <form onSubmit={this.onSubmit}
                      onReset={this.onReset}>
                    <div className="form-area">
                        <div className="form-item">
                            <label>Title</label>
                            <input type='text'
                                   name='title'
                                   value={title}
                                   onChange={this.onChange}/>
                        </div>
                        <div className="form-item">
                            <label>Description</label>
                            <textarea name='description'
                                      value={description}
                                      onChange={this.onChange}/>
                        </div>
                        <div className="form-item">
                            <label>Address</label>
                            <textarea name='address'
                                      value={address}
                                      onChange={this.onChange}/>
                        </div>
                        <div className="form-item">
                            <label>Ending Date [YYYY-MM-DD]</label>
                            <input type="text"
                                   name="end_date"
                                   value={end_date}
                                   onChange={this.onChange}/>
                        </div>
                        <div className="form-item">
                            <label>Category</label>
                            <div className="select-box">
                                <select name="category" onChange={this.onChange}>
                                    {this.state.categories.map(category =>
                                        <option key={category.id}
                                                value={category.id}
                                        >{category.name}
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="form-item">
                            <label>Latitude</label>
                            <input type="text"
                                   name="lat"
                                   value={lat}
                                   onChange={this.onChange}/>
                        </div>
                        <div className="form-item">
                            <label>Longitude</label>
                            <input type="text"
                                   name="long"
                                   value={long}
                                   onChange={this.onChange}/>
                        </div>
                        <div className="form-item">
                            <button type="submit" className="btn full">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withAlert(NeedMenu);