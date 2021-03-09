import React from "react";
import "./SideNav.css";
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: document.location.pathname,
            activeNavItem: '',
            navData: this.props.routeData,
            showAddPageInputBox: false,
            pageName: "",
            iconName: "",
            siteCardData: this.props.selectedSiteCard,
        }
    }
    componentDidMount() {
        let navData = this.state.navData;
        let path = this.state.path
        let filteredActiveItem = navData.filter(data => data.to === path)[0]
        this.setState({
            navData: navData,
            activeNavItem: filteredActiveItem.id.replace(/ /g, "").toLowerCase()
        })
    }
    handleNav(nav) {
        this.setState({
            activeNavItem: nav.id.replace(/ /g, "").toLowerCase()
        })
    }
    handleBackToSitePage() {
        this.props.level(0)
    }
    render() {
        const { activeNavItem } = this.state;

        return (
            <div>
                <label className="nav-header ml-2 py-2"><i className="fa fa-arrow-left back-to-site-page-icon" onClick={this.handleBackToSitePage.bind(this)} /></label>
                
                <div className="lists">
                    {this.state.navData?.map((nav, navIdx) =>
                        <div key={navIdx}>
                            <Link to={nav.to}>
                                <Row onClick={this.handleNav.bind(this, nav)} className={`${activeNavItem.toLowerCase() === nav.id.replace(/ /g, "").toLowerCase() ? 'mx-1 activeNavItem' : 'mx-1 list-items'}`} >
                                    <Col xs="3" className="text-left icon-col p-0 m-0 pl-1">
                                        <i className={nav.icon} />
                                    </Col>
                                    {this.props.hoverOnSideNav &&
                                        <Col xs="9" className="text-left label-col p-0 m-0">
                                            {nav.label}
                                        </Col>
                                    }
                                </Row>
                            </Link>
                            {nav.children &&
                                nav.children.map((subMenu, subMenuIdx) =>
                                    <div key={subMenuIdx}>
                                        <Row onClick={this.handleNav.bind(this, subMenu)}
                                            className="mx-1 m-0 list-items"
                                        >
                                            <Col xs="3" className="icon-col p-0 m-0 pl-1"><i className={subMenu.icon} /></Col>
                                            {this.props.hoverOnSideNav &&
                                                <Col xs="9" className="text-left label-col p-0 m-0">{subMenu.label}</Col>
                                            }
                                        </Row>
                                    </div>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
        );
    }
}