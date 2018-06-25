// Packages
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import {withAlert} from 'react-alert';

// Actions
import {
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
} from "../../constants/serviceConstants";

// Services
import {createUser, forgotUserPassword, retrieveUser} from "../../services/userServices";
import {setAuthInformations, isAuthentication} from "../../services/baseServices";
import {authLogin} from "../../services/coreServices";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Modals state
            registerModal: false,
            loginModal: false,
            forgotPasswordModal: false,

            // User state
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            confirm_password: "",

            // User and errors state
            user: {},
            errors: {}
        };

        this.handleOpenRegister = this.handleOpenRegister.bind(this);
        this.handleCloseRegister = this.handleCloseRegister.bind(this);

        this.handleOpenLogin = this.handleOpenLogin.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);

        this.handleOpenForgotPassword = this.handleOpenForgotPassword.bind(this);
        this.handleCloseForgotPassword = this.handleCloseForgotPassword.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.onReset = this.onReset.bind(this);

        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onSubmitForgot = this.onSubmitForgot.bind(this);
    }

    componentDidMount() {
        Modal.setAppElement('#root');
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
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
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            confirm_password: "",
            errors: {}
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        let data = {
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            password: this.state.password,
            confirm_password: this.state.confirm_password
        };

        createUser(data, (response) => {
            if (response) {
                if (response.statusCode === HTTP_201_CREATED) {
                    this.onReset();
                    window.location.reload();
                    this.props.alert.success('Your registration was successful!')
                } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
                    this.setErrors(response.body);
                } else {
                    this.onReset();
                    this.props.alert.error('An unexpected error has occurred and try again later');
                }
            } else {
                this.onReset();
                this.props.alert.error('An unexpected error has occurred and try again later');
            }
        });
    };

    onSubmitLogin = (e) => {
        e.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password
        };

        authLogin(data, (response) => {
            if (response) {
                if (response.statusCode === HTTP_200_OK) {
                    this.onReset();
                    setAuthInformations(response.body.auth_token, response.body.user_id);
                    window.location.reload();
                } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
                    this.setErrors(response.body);
                } else {
                    this.onReset();
                    this.props.alert.error("An unexpected error has occurred and try again later.");
                }
            } else {
                this.onReset();
                this.props.alert.error('An unexpected error has occurred and try again later');
            }
        });
    };

    onSubmitForgot = (e) => {
        e.preventDefault();
        let data = {
            email: this.state.email
        };

        forgotUserPassword(data, (response) => {
            if (response) {
                if (response.statusCode === HTTP_200_OK) {
                    this.onReset();
                    this.props.alert.success('We\'ve sent you an email');
                } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
                    this.setErrors(response.body);
                    this.props.alert.error('Please correct the errors and try again.');
                } else {
                    this.onReset();
                    this.props.alert.error('Please correct the errors and try again.');
                }
            } else {
                this.onReset();
            }
        });
    };


    handleOpenRegister() {
        this.setState({registerModal: true});
    };

    handleCloseRegister() {
        this.setState({registerModal: false});
    };

    handleOpenLogin() {
        this.setState({loginModal: true});
    };

    handleCloseLogin() {
        this.setState({loginModal: false});
    };

    handleOpenForgotPassword() {
        this.setState({forgotPasswordModal: true});
    };

    handleCloseForgotPassword() {
        this.setState({forgotPasswordModal: false});
    };

    handleClick = e => {
        e.preventDefault();
        this.props.rightNowHandler();
    };

    componentWillMount() {
        if (isAuthentication()) {
            retrieveUser((response) => {
                if (response) {
                    if (response.statusCode === HTTP_200_OK) {
                        this.setState({
                            user: response.body
                        });
                    }
                }
                this.setState({isLoading: false});
            });
        }
    };

    render() {
        const {email, user, first_name, last_name, password, confirm_password} = this.state;

        // Check if user is logged in.
        // If not logged in, default menu is shown.
        // Else the logged in menu is shown.
        if (!isAuthentication()) {
            return (
                <header>
                    <div className="container">

                        {/*Logo*/}
                        <Link to="/" className="logo"><img src="/images/logo/logo.png" alt=""/></Link>

                        {/*Search and location filter inputs*/}
                        <div className="head-form">
                            <div className="input"><input type="text" placeholder="Search words"/></div>
                            <div className="select-box">
                                <select>
                                    <option>Location</option>
                                    <option>Option1</option>
                                    <option>Option2</option>
                                    <option>Option3</option>
                                    <option>Option4</option>
                                    <option>Option5</option>
                                </select>
                            </div>
                        </div>

                        {/*Signup / Login button*/}
                        <div className="head-nav">
                            <ul className="login-signup">
                                <li><Link to="#register" className="register-btn"
                                          onClick={this.handleOpenRegister}>Sign up</Link>
                                </li>
                                <li><Link to="/" className="login-btn"
                                          onClick={this.handleOpenLogin}>Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/*Register Modal*/}
                    <Modal
                        isOpen={this.state.registerModal}
                        contentLabel="Register"
                        onRequestClose={this.handleCloseRegister}>

                        <form id="register" className="modal"
                              onSubmit={this.onSubmit}
                              onReset={this.onReset}>
                            <div className="modal-content">
                                <Link to="#" className="close"
                                      onClick={this.handleCloseRegister}>
                                    <i className="material-icons">close</i></Link>
                                <div className="modal-img"/>
                                <div className="form-area">
                                    <div className="form-title">
                                        <h4>Register.</h4>
                                        <p>Complete all the fields in order to complete your
                                            registration</p>
                                    </div>
                                    <div className="form-item">
                                        <span className="error-message">{this.state.errors.first_name}</span>
                                        <input type="text"
                                               name="first_name"
                                               placeholder="Name"
                                               value={first_name}
                                               onChange={this.onChange}/>
                                    </div>
                                    <div className="form-item">
                                        <span className="error-message">{this.state.errors.last_name}</span>
                                        <input type="text"
                                               name="last_name"
                                               placeholder="Surname"
                                               value={last_name}
                                               onChange={this.onChange}/>
                                    </div>
                                    <div className="form-item">
                                        <span className="error-message">{this.state.errors.email}</span>
                                        <input type="email"
                                               name="email"
                                               placeholder="E-Mail"
                                               value={email}
                                               onChange={this.onChange}/>
                                    </div>
                                    <div className="form-item">
                                        <span className="error-message">{this.state.errors.password}</span>
                                        <input type="password"
                                               name="password"
                                               placeholder="Password"
                                               value={password}
                                               onChange={this.onChange}/>
                                    </div>
                                    <div className="form-item">
                                        <span className="error-message">{this.state.errors.confirm_password}</span>
                                        <input type="password"
                                               name="confirm_password"
                                               placeholder="Confirm Password"
                                               value={confirm_password}
                                               onChange={this.onChange}/>
                                    </div>
                                    <div className="form-item">
                                        <div className="checkbox">
                                            <input type="checkbox" id="privacy" name="privacy"/>
                                            <label htmlFor="privacy">I have read and I accept the terms of use.</label>
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <button type="submit" className="btn full">Continue</button>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-info">Do you already have an account?
                                            <Link to="#" onClick={(event) => {
                                                this.handleCloseRegister();
                                                this.handleOpenLogin();
                                            }}>Log in here</Link></p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal>

                    {/*Login Modal*/
                    }
                    <Modal
                        isOpen={this.state.loginModal}
                        contentLabel="Login"
                        onRequestClose={this.handleCloseLogin}>

                        <form id="login" className="modal login-modal" onSubmit={this.onSubmitLogin}
                              onReset={this.onReset}>
                            <div className="modal-content">
                                <Link to="#" className="close" onClick={this.handleCloseLogin}>
                                    <i className="material-icons">close</i></Link>
                                <div className="form-area">
                                    <div className="form-title">
                                        <h4>Welcome.</h4>
                                        <p>Fill in the required fields to log in.</p>
                                    </div>
                                    <div className="form-item">
                                        <span className="error-message">{this.state.errors.email}</span>
                                        <input type="email" name="email" placeholder="E-Mail" value={email}
                                               onChange={this.onChange}/>
                                    </div>
                                    <div className="form-item">
                                        <span className="error-message">{this.state.errors.password}</span>
                                        <input type="password" name="password" placeholder="Password"
                                               value={password}
                                               onChange={this.onChange}/>
                                        <Link to="#" className="forgot-password"
                                              onClick={this.handleOpenForgotPassword}>
                                            Forgot Password</Link>
                                    </div>
                                    <div className="form-item">
                                        <button type="submit" className="btn full">Login</button>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-info">If you're not a member yet, please
                                            <Link to="#"
                                                  onClick={(event) => {
                                                      this.handleCloseLogin();
                                                      this.handleOpenRegister();
                                                  }}>Register</Link></p>
                                    </div>
                                </div>
                                <div className="modal-img"/>
                            </div>
                        </form>
                    </Modal>

                    {/*Forgot Password Modal*/
                    }
                    <Modal
                        isOpen={this.state.forgotPasswordModal}
                        contentLabel="ForgotPassword"
                        onRequestClose={this.handleCloseForgotPassword}>

                        <form id="forgot-password" className="modal forgot-password-modal"
                              onSubmit={this.onSubmitForgot}
                              onReset={this.onReset}>
                            <div className="modal-content">
                                <Link to="#" className="close"
                                      onClick={this.handleCloseForgotPassword}>
                                    <i className="material-icons">close</i></Link>
                                <div className="form-area">
                                    <div className="form-title">
                                        <h4>Forgot Password.</h4>
                                        <p>Fill in the required fields to log in.</p>
                                    </div>
                                    <div className="form-item">
                                        <span className="error-message">{this.state.errors.email}</span>
                                        <input type="email"
                                               name="email"
                                               placeholder="E-Mail"
                                               value={email}
                                               onChange={this.onChange}/>
                                    </div>
                                    <div className="form-item">
                                        <button type="submit"
                                                className="btn full">Send
                                        </button>
                                    </div>
                                    <div className="form-item">
                                        <p className="form-info">If you're not a member yet, please
                                            <Link to="#"
                                                  onClick={(event) => {
                                                      this.handleCloseForgotPassword();
                                                      this.handleOpenRegister();
                                                  }}>Register</Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="modal-img"/>
                            </div>
                        </form>
                    </Modal>
                </header>
            );
        } else {
            return (
                <header>
                    <div className="container">
                        <Link to="/" className="logo"><img src="/images/logo/logo.png" alt=""/></Link>
                        <div className="head-form">
                            <div className="input"><input type="text" placeholder="Search words"/></div>
                            <div className="select-box">
                                <select>
                                    <option>Location</option>
                                    <option>Option1</option>
                                    <option>Option2</option>
                                    <option>Option3</option>
                                    <option>Option4</option>
                                    <option>Option5</option>
                                </select>
                            </div>
                        </div>
                        <Link to="#" className="menu-btn"
                              onClick={this.handleClick}>
                            <i className="material-icons">menu</i></Link>
                        <div className="head-nav">
                            <div className="user-nav">
                                <span className="username">Hello, {user.first_name}! <i
                                    className="material-icons">arrow_drop_down</i></span>
                                <ul>
                                    <li><Link to="/settings">Settings</Link></li>
                                    <li><Link to="/logout">Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
            );
        }
    }
}

export default withAlert(Header);