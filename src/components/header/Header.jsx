import React, { Component } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEllipsisV, faAlignLeft, faInfoCircle, faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons'

class Header extends Component{
    render(){
        return(
            <div className="row header-row">
               <div className="col-md-4 col-sm-4">
                   <img src="/images/digitaldots.png" height="28px" width="28px" alt="DigitalDots Logo" className="DigitalDots-Logo" />
                    <label className="main-title">DigitalDots</label>
                    <i className="alignLeftIcon"><FontAwesomeIcon icon={faAlignLeft} /></i>
                    <i className="infoCircleIcon"><FontAwesomeIcon icon={faInfoCircle} /></i>
                    <i className="searchIcon"><FontAwesomeIcon icon={faSearch} /></i>
                    <i className="faBars"><FontAwesomeIcon icon={faBars} /></i>
               </div>
               <div className="col-md-7 col-sm-7"></div>
               <div className="col-md-1 col-sm-1">
                    <i className="bellIcon"><FontAwesomeIcon icon={faBell} /></i>
                    <i className="userIcon"><FontAwesomeIcon icon={faUser} /></i>
                    <i className="faEllipsisV text-right"><FontAwesomeIcon icon={faEllipsisV} /></i>
                </div>
            </div>
        );
    }
}
export default Header;