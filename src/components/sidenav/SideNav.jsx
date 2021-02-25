import React from "react";
import "./SideNav.css";
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routeJson from '../routeData/RouteJson';
import CustomDefaultPage from '../customDefaultComponent/CustomDefaultPage'

// const NAV_DATA = [
//     { id: "home", to: "/Home", label: "Home", icon: "fa fa-home" },
//     { id: "dashboard", to: "/Dashboard", label: "Dashboard", icon: "fa fa-user-cog" },
//     { id: "usertasks", to: "/Usertasks", label: "User Tasks", icon: "fa fa-tasks" },
//     { id: "solutions", to: "/Solutions", label: "Solutions", icon: "fa fa-atom" },
//     { id: "environments", to: "/Environments", label: "Environments", icon: "fa fa-cloud-meatball" },
//     { id: "datastores", to: "/Data stores", label: "Data stores", icon: "fa fa-database" },
//     { id: "reports", to: "/Reports", label: "Reports", icon: "fa fa-chart-line" },
//     { id: "templates", to: "/Templates", label: "Templates", icon: "fa fa-file-code" },
//     { id: "assest", to: "/Assest", label: "Assest", icon: "fa fa-shopping-cart" },
//     { id: "Store", to: "/Store", label: "Store", icon: "fa fa-lock" },
//     { id: "signOut", to: "/SignOut", label: "Sign Out", icon: "fa fa-sign-out-alt" },
// ]

export default class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: document.location.pathname,
            activeNav: '',
            navData: routeJson,
            // [
            //     { id: "home1", to: "/Home", label: "Home", icon: "fa fa-home" },
            //     { id: "dashboard1", to: "/Dashboard", label: "Dashboard", icon: "fa fa-user-cog" },
            //     { id: "usertasks1", to: "/Usertasks", label: "User Tasks", icon: "fa fa-tasks" },
            //     { id: "solutions1", to: "/Solutions", label: "Solutions", icon: "fa fa-atom" },
            //     { id: "environments1", to: "/Environments", label: "Environments", icon: "fa fa-cloud-meatball" },
            //     { id: "datastores1", to: "/Data stores", label: "Data stores", icon: "fa fa-database" },
            //     // { id: "reports1", to: "/Reports", label: "Reports", icon: "fa fa-chart-line" },
            //     // { id: "templates1", to: "/Templates", label: "Templates", icon: "fa fa-file-code" },
            //     // { id: "assest1", to: "/Assest", label: "Assest", icon: "fa fa-shopping-cart" },
            //     // { id: "Store1", to: "/Store", label: "Store", icon: "fa fa-lock" },
            //     { id: "signOut1", to: "/SignOut", label: "Sign Out", icon: "fa fa-sign-out-alt" },
            // ],
            showAddPageInputBox: false,
            pageName: "",
        }
    }
    componentDidMount() {
        let location = this.state.location;
        this.setState({
            activeNav: location.slice(1).toLowerCase()
        })
    }
    handleNav(nav) {
        this.setState({
            activeNav: nav.label.toLowerCase()
        })
    }
    submitNewPage() {
        let navData = routeJson; //this.state.navData
        let pageName = this.state.pageName;
        let uid = new Date().getTime();
        let navDataObj = {
            id: pageName + uid,
            to: "/" + pageName.replace(/ /g, ""),
            exact: "true",
            label: pageName,
            component: CustomDefaultPage,
            icon: "fa fa-lock"
        }

        navData.push(navDataObj)
        this.setState({ showAddPageInputBox: false, pageName: "" })
    }
    render() {
        const { activeNav, showAddPageInputBox, pageName } = this.state;
        console.log("navData", this.state.navData)
        return (
            <div>
                <label className="nav-header ml-2 py-2">Studio</label>
                {this.props.hoverOnSideNav &&
                    <>
                        <div className="float-right px-2 pt-2">
                            <Button variant="primary" size="sm" onClick={() => this.setState({ showAddPageInputBox: true })}>+ Page</Button>
                        </div>
                        {(showAddPageInputBox && this.props.hoverOnSideNav) &&
                            <div className="p-2">
                                <Row xs="2" className="m-0">
                                    <Col className="p-0 text-left"><small className="m-0">Page Name</small></Col>
                                    <Col className="p-0 text-right"><i className="fa fa-times fa-xs" onClick={() => this.setState({ showAddPageInputBox: false, pageName: "" })} /></Col>
                                </Row>
                                <Row xs="1" className="m-0">
                                    <Col className="p-0">
                                        <input type="text" value={pageName} onChange={(e) => this.setState({ pageName: e.target.value }) } maxLength="10" className="add-page-input" />
                                    </Col>
                                    <Col className="p-0 pt-1 text-right">
                                        <Button variant="primary" size="sm" 
                                            onClick={this.submitNewPage.bind(this)} disabled = {pageName.length === 0}
                                        >
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        }
                    </>
                }
                <div className="lists">
                    {/* {NAV_DATA.map((nav, navIdx) => */}
                    {this.state.navData.map((nav, navIdx) =>
                        <Link key={navIdx} to={nav.to}>
                            <Row onClick={this.handleNav.bind(this, nav)} className={`${activeNav.toLowerCase() === nav.to.slice(1).toLowerCase() ? 'mx-1 activeNavItem' : 'mx-1 list-items'}`} >
                                <Col xs="3" className="text-left icon-col p-0 m-0 pl-1">
                                    <i className={nav.icon} />
                                </Col>
                                {this.props.hoverOnSideNav &&
                                    <Col xs="9" className="text-left label-col p-0 m-0">{nav.label}</Col>
                                }
                            </Row>
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}