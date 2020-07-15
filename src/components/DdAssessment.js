import React, { Component } from 'react';
import "./css/DdAssessment.css";
import Header from './Header.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCog, faTasks, faAtom, faCloudMeatball, faDatabase, faChartLine, faFileCode, faShoppingCart, faLock, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Home from './Home.js';
import Dashboard from './Dashboard';

class DdAssessment extends Component {
    render() {
        return (
            <div>
                <div className="row main-row">
                    <div className="col-md-12 col-sm-12 main-col">
                        <Header />
                        <Router>
                            <div className="row sub-row">
                                <div className="col-md-2 col-sm-2 sideNav">
                                    <div className="container">
                                        <label className="nav-header">Digital Studio</label>
                                        <div className="lists ">
                                            <Link to="/Home"><li className="list-items"><FontAwesomeIcon icon={faHome} className="sideNav-1Icon" />Home</li></Link>
                                            <Link to="/Dashboard"><li className="list-items"><FontAwesomeIcon icon={faUserCog} className="sideNav-2Icon" />Dashboard</li></Link>
                                            <li className="list-items"><a ><FontAwesomeIcon icon={faTasks} className="sideNav-3Icon" />User Tasks</a></li>
                                            <li className="list-items"><a ><FontAwesomeIcon icon={faAtom} className="sideNav-4Icon" />Solutions</a></li>
                                            <li className="list-items"><a ><FontAwesomeIcon icon={faCloudMeatball} className="sideNav-5Icon" />Environments</a></li>
                                            <li className="list-items"><a ><FontAwesomeIcon icon={faDatabase} className="sideNav-6Icon" />Data Stores</a></li>
                                            <li className="list-items"><a ><FontAwesomeIcon icon={faChartLine} className="sideNav-7Icon" />Reports</a></li>
                                            <li className="list-items"><a ><FontAwesomeIcon icon={faFileCode} className="sideNav-8Icon" />Templates</a></li>
                                            <li className="list-items"><a ><FontAwesomeIcon icon={faShoppingCart} className="sideNav-9Icon" />Assest</a></li>
                                            <li className="list-items"><a ><FontAwesomeIcon icon={faLock} className="sideNav-10Icon" />Store</a></li>
                                            <li className="list-items"><a ><FontAwesomeIcon icon={faUsers} className="sideNav-11Icon" />User Management</a></li>
                                            <li className="list-items"><a ><FontAwesomeIcon icon={faSignOutAlt} className="sideNav-12Icon" />Sign out</a></li>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-10 col-sm-10 content">
                                    <Route path="/Home" component={Home} />
                                    <Route path="/Dashboard" component={Dashboard} />
                                </div>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}
export default DdAssessment;