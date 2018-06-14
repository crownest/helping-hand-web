// Packages
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';

Modal.setAppElement('#root');


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerModal: false,
            loginModal: false,
            forgotPasswordModal: false
        };

        this.handleOpenRegister = this.handleOpenRegister.bind(this);
        this.handleCloseRegister = this.handleCloseRegister.bind(this);

        this.handleOpenLogin = this.handleOpenLogin.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);

        this.handleOpenForgotPassword = this.handleOpenForgotPassword.bind(this);
        this.handleCloseForgotPassword = this.handleCloseForgotPassword.bind(this);
    }


    handleOpenRegister() {
        this.setState({registerModal: true});
    }

    handleCloseRegister() {
        this.setState({registerModal: false});
    }

    handleOpenLogin() {
        this.setState({loginModal: true});
    }

    handleCloseLogin() {
        this.setState({loginModal: false});
    }

    handleOpenForgotPassword() {
        this.setState({forgotPasswordModal: true});
    }

    handleCloseForgotPassword() {
        this.setState({forgotPasswordModal: false});
    }

    handleClick = e => {
        e.preventDefault();
        this.props.rightNowHandler();
    }

    render() {
        return (
            <header>
                <div className="container">
                    <Link to="#" className="logo"><img src="/images/logo/logo.png" alt=""/></Link>
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
                          onClick={this.handleClick}><i
                        className="material-icons">menu</i></Link>
                    <div className="head-nav">
                        <ul className="login-signup">
                            <li><Link to="#register" className="register-btn" onClick={this.handleOpenRegister}>Sign
                                up</Link>
                            </li>
                            <li><Link to="#login" className="login-btn" onClick={this.handleOpenLogin}>Login</Link></li>
                        </ul>

                        <div className="user-nav hide">
                            <span className="username">@johndoe <i className="material-icons">arrow_drop_down</i></span>
                            <ul>
                                <li><Link to="#">Supports</Link></li>
                                <li><Link to="#">Needs</Link></li>
                                <li><Link to="#">Settings</Link></li>
                                <li><Link to="#">Exit</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/*Register Modal*/}
                <Modal
                    isOpen={this.state.registerModal}
                    contentLabel="Register"
                    onRequestClose={this.handleCloseRegister}>

                    <div id="register" className="modal">
                        <div className="modal-content">
                            <a href="#" className="close" onClick={this.handleCloseRegister}><i
                                className="material-icons">close</i></a>
                            <div className="modal-img"></div>
                            <div className="form-area">
                                <div className="form-title">
                                    <h4>Register.</h4>
                                    <p>Complete all the fields in order to complete your registration</p>
                                </div>
                                <div className="form-item">
                                    <input type="text" name="name" placeholder="Name"/>
                                </div>
                                <div className="form-item">
                                    <input type="text" name="surname" placeholder="Surname"/>
                                </div>
                                <div className="form-item">
                                    <input type="email" name="email" placeholder="E-Mail"/>
                                </div>
                                <div className="form-item">
                                    <input type="password" name="password" placeholder="Password"/>
                                </div>
                                <div className="form-item">
                                    <input type="password" name="confirm-password" placeholder="Confirm Password"/>
                                </div>
                                <div className="form-item">
                                    <div className="select-box gender-select">
                                        <select>
                                            <option>Gender</option>
                                            <option>Erkek</option>
                                            <option>Kadın</option>
                                        </select>
                                    </div>
                                    <div className="select-box country-select">
                                        <select>
                                            <option>Country</option>
                                            <option>Türkiye</option>
                                            <option>Amerika</option>
                                            <option>Almanya</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="form-item">
                                    <div className="checkbox">
                                        <input type="checkbox" id="privacy" name="privacy"/>
                                        <label htmlFor="privacy">Kullanım koşullarını okudum ve kabul ediyorum.</label>
                                    </div>
                                </div>
                                <div className="form-item">
                                    <button type="submit" className="btn full">Continue</button>
                                </div>
                                <div className="form-item">
                                    <p className="form-info">Do you already have an account? <a href="#"
                                                                                                onClick={(event) => {
                                                                                                    this.handleCloseRegister();
                                                                                                    this.handleOpenLogin();
                                                                                                }}>Log in here</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                {/*Login Modal*/}
                <Modal
                    isOpen={this.state.loginModal}
                    contentLabel="Login"
                    onRequestClose={this.handleCloseLogin}>
                    <div id="login" className="modal login-modal">
                        <div className="modal-content">
                            <a href="#" className="close" onClick={this.handleCloseLogin}><i
                                className="material-icons">close</i></a>
                            <div className="form-area">
                                <div className="form-title">
                                    <h4>Welcome.</h4>
                                    <p>Fill in the required fields to log in.</p>
                                </div>
                                <div className="form-item">
                                    <input type="email" name="email" placeholder="E-Mail"/>
                                </div>
                                <div className="form-item">
                                    <input type="password" name="password" placeholder="Password"/>
                                    <a href="#" className="forgot-password" onClick={this.handleOpenForgotPassword}>Forgot
                                        Password</a>
                                </div>
                                <div className="form-item">
                                    <button type="submit" className="btn full">Login</button>
                                </div>
                                <div className="form-item">
                                    <p className="form-info">If you're not a member yet, please <a href="#"
                                                                                                   onClick={(event) => {
                                                                                                       this.handleCloseLogin();
                                                                                                       this.handleOpenRegister();
                                                                                                   }}>Register</a></p>
                                </div>
                            </div>
                            <div className="modal-img"></div>
                        </div>
                    </div>
                </Modal>

                {/*Forgot Password Modal*/}
                <Modal
                    isOpen={this.state.forgotPasswordModal}
                    contentLabel="ForgotPassword"
                    onRequestClose={this.handleCloseForgotPassword}>

                    <div id="forgot-password" className="modal forgot-password-modal">
                        <div className="modal-content">
                            <a href="#" className="close" onClick={this.handleCloseForgotPassword}><i className="material-icons">close</i></a>
                            <div className="form-area">
                                <div className="form-title">
                                    <h4>Forgot Password.</h4>
                                    <p>Fill in the required fields to log in.</p>
                                </div>
                                <div className="form-item">
                                    <input type="email" name="email" placeholder="E-Mail"/>
                                </div>
                                <div className="form-item">
                                    <button type="submit" className="btn full">Send</button>
                                </div>
                                <div className="form-item">
                                    <p className="form-info">If you're not a member yet, please <a href="#" onClick={(event) => {
                                                                                                    this.handleCloseForgotPassword();
                                                                                                    this.handleOpenRegister();
                                                                                                }}>Register</a>
                                    </p>
                                </div>
                            </div>
                            <div className="modal-img"></div>
                        </div>
                    </div>
                </Modal>
            </header>
        )
    }
}