// Packages
import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class RightNav extends Component {
    constructor() {
        super();
    }

    render() {
        const isRightActiveClass = this.props.isOpen ? 'open' : '';
        return (
            <div className={"right-menu " + isRightActiveClass}>
                <div className="search-area">
                    <input type="text" name="search" placeholder="Category, location, need search"/>
                    <button type="submit"><i className="material-icons">search</i></button>
                </div>
                <ul>
                    <li>
                        <Link to="#">
                            <div className="img"><img src="/images/temp/img01.jpg" alt=""/></div>
                            <div className="text">
                                <h6><img src="/images/icon/durum-mini-1.png" alt=""/><span>Headline</span></h6>
                                <p>Yardıma ihtiyacı olanların bilgilerinin kısaltması burada yer alacak.</p>
                                <span className="count">1326 people wanted to help.</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <div className="img"><img src="/images/temp/img01.jpg" alt=""/></div>
                            <div className="text">
                                <h6><img src="/images/icon/durum-mini-2.png" alt=""/><span>Headline</span></h6>
                                <p>Yardıma ihtiyacı olanların bilgilerinin kısaltması burada yer alacak.</p>
                                <span className="count">1326 people wanted to help.</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <div className="img"><img src="/images/temp/img01.jpg" alt=""/></div>
                            <div className="text">
                                <h6><img src="/images/icon/durum-mini-3.png" alt=""/><span>Headline</span></h6>
                                <p>Yardıma ihtiyacı olanların bilgilerinin kısaltması burada yer alacak.</p>
                                <span className="count">1326 people wanted to help.</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <div className="img"><img src="/images/temp/img01.jpg" alt=""/></div>
                            <div className="text">
                                <h6><img src="/images/icon/durum-mini-4.png" alt=""/><span>Headline</span></h6>
                                <p>Yardıma ihtiyacı olanların bilgilerinin kısaltması burada yer alacak.</p>
                                <span className="count">1326 people wanted to help.</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <div className="img"><img src="/images/temp/img01.jpg" alt=""/></div>
                            <div className="text">
                                <h6><img src="/images/icon/durum-mini-5.png" alt=""/><span>Headline</span></h6>
                                <p>Yardıma ihtiyacı olanların bilgilerinin kısaltması burada yer alacak.</p>
                                <span className="count">1326 people wanted to help.</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <div className="img"><img src="/images/temp/img01.jpg" alt=""/></div>
                            <div className="text">
                                <h6><img src="/images/icon/durum-mini-4.png" alt=""/><span>Headline</span></h6>
                                <p>Yardıma ihtiyacı olanların bilgilerinin kısaltması burada yer alacak.</p>
                                <span className="count">1326 people wanted to help.</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <div className="img"><img src="/images/temp/img01.jpg" alt=""/></div>
                            <div className="text">
                                <h6><img src="/images/icon/durum-mini-5.png" alt=""/><span>Headline</span></h6>
                                <p>Yardıma ihtiyacı olanların bilgilerinin kısaltması burada yer alacak.</p>
                                <span className="count">1326 people wanted to help.</span>
                            </div>
                        </Link>
                    </li>
                </ul>
                <Link to="#" className="btn full">Show other need</Link>
            </div>
        );
    }
}
