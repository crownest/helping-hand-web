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
            showModal: false,
            seeModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.seeOpenModal = this.seeOpenModal.bind(this);
        this.seeCloseModal = this.seeCloseModal.bind(this);
    }


    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    seeOpenModal() {
        this.setState({seeModal: true});
    }

    seeCloseModal() {
        this.setState({seeModal: false});
    }

    handleClick = e => {
        e.preventDefault();
        this.props.rightNowHandler();
    }

    onClick(event) {
        this.handleCloseModal;
        this.seeOpenModal;
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
                            <li><Link to="#register" className="register-btn" onClick={this.handleOpenModal}>Sign
                                up</Link>
                            </li>
                            <li><Link to="#login" className="login-btn" onClick={this.seeOpenModal}>Login</Link></li>
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
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Register"
                    onRequestClose={this.handleCloseModal}>
                    <div id="register" className="modal">

                        <div className="modal-content">
                            <a href="#" className="close" onClick={this.handleCloseModal}><i
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
                                    <p className="form-info">Do you already have an account? <a href="#" onClick={(event) => { this.handleCloseModal(); this.seeOpenModal();}}>Log
                                        in here</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={this.state.seeModal}
                    contentLabel="Login"
                    onRequestClose={this.seeCloseModal}>
                    <div id="login" className="modal login-modal">
                        <div className="modal-content">
                            <a href="#" className="close" onClick={this.seeCloseModal}><i
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
                                    <a href="#" className="forgot-password">Forgot Password</a>
                                </div>
                                <div className="form-item">
                                    <button type="submit" className="btn full">Login</button>
                                </div>
                                <div className="form-item">
                                    <p className="form-info">If you're not a member yet, please <a href="#" onClick={(event) => { this.seeCloseModal(); this.handleOpenModal();}}>Register</a>
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