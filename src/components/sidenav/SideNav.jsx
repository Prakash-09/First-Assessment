import React from "react";
import "./SideNav.css";
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routeJson from '../routeData/RouteJson';
import CustomDefaultPage from '../customDefaultComponent/CustomDefaultPage'


export default class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: document.location.pathname,
            activeNavItem: '',
            navData: routeJson,
            showAddPageInputBox: false,
            pageName: "",
            iconName: "",
        }
    }
    // componentDidMount() {
    //     let path = this.state.path;
    //     this.setState({
    //         activeNavItem: path.slice(1).toLowerCase()
    //     })
    // }
    handleNav(nav) {
        this.setState({
            activeNavItem: nav.id.replace(/ /g, "").toLowerCase()
        })
    }
    submitNewPage() {
        let navData = this.state.navData; //routeJson
        let activeNavItem = this.state.activeNavItem;
        let pageName = this.state.pageName;
        let iconName = this.state.iconName;
        let selectedNavItem = navData.filter(navItem => navItem.id.replace(/ /g, "").toLowerCase() === activeNavItem)[0]
        let uid = new Date().getTime();

        if ((activeNavItem === "" ) || (selectedNavItem.label.toLowerCase() === "home" )) {
            let navDataObj = {
                id: pageName + uid,
                to: "/" + pageName.replace(/ /g, ""),
                exact: true,
                label: pageName,
                component: CustomDefaultPage,
                icon: iconName,
                subMenu: true,
                children: []
            }
            navData.push(navDataObj)
        } else if ((selectedNavItem.length !== 0) && (selectedNavItem.label.toLowerCase() !== "home" )) {
            let subNavDataObj = {
                id: pageName + uid,
                to: selectedNavItem.to + "/" + pageName.replace(/ /g, ""),
                exact: true,
                label: pageName,
                component: CustomDefaultPage,
                icon: iconName
            }
            selectedNavItem.children.push(subNavDataObj)
        }

        this.setState({ showAddPageInputBox: false, pageName: "", iconName: "" })
    }
    render() {
        const { activeNavItem, showAddPageInputBox, pageName, iconName } = this.state;
        // console.log("navData", this.state.navData)

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
                                    <Col className="p-0 text-right"><i className="fa fa-times fa-xs" onClick={() => this.setState({ showAddPageInputBox: false, pageName: "", iconName: "" })} /></Col>
                                </Row>
                                <Row xs="1" className="m-0">
                                    <Col className="p-0">
                                        <input type="text" value={pageName} onChange={(e) => this.setState({ pageName: e.target.value })} maxLength="12" className="add-page-input" />
                                    </Col>
                                    <Col className="p-0">
                                        <small className="m-0">Icon Name</small>
                                        <input type="text" value={iconName} placeholder="fa fa-icon" onChange={(e) => this.setState({ iconName: e.target.value })} className="add-icon-input" />
                                    </Col>
                                    <Col className="p-0 pt-1 text-right">
                                        <Button variant="primary" size="sm"
                                            onClick={this.submitNewPage.bind(this)} disabled={(pageName.length === 0) || (iconName.length === 0)}
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
                    {this.state.navData.map((nav, navIdx) =>
                        <div key={navIdx}>
                            <Link to={nav.to}>
                                <Row onClick={this.handleNav.bind(this, nav)} className={`${activeNavItem.toLowerCase() === nav.id.replace(/ /g, "").toLowerCase() ? 'mx-1 activeNavItem' : 'mx-1 list-items'}`} >
                                    <Col xs="3" className="text-left icon-col p-0 m-0 pl-1">
                                        <i className={nav.icon} />
                                    </Col>
                                    {this.props.hoverOnSideNav &&
                                        <Col xs="9" className="text-left label-col p-0 m-0">{nav.label}</Col>
                                    }
                                </Row>
                            </Link>
                            {(nav.subMenu && nav.children) &&
                                nav.children.map((subMenu, subMenuIdx) =>
                                    <Link key={subMenuIdx} to={subMenu.to}>
                                        <Row className="m-0" onClick={this.handleNav.bind(this, subMenu)} className={`${activeNavItem.toLowerCase() === subMenu.id.replace(/ /g, "").toLowerCase() ? 'mx-1 activeNavItem' : 'mx-1 list-items'}`}>
                                            <Col xs="3" className="text-center icon-col p-0 m-0 pl-1"><i className={subMenu.icon} /></Col>
                                            {this.props.hoverOnSideNav &&
                                                <Col xs="9" className="text-left label-col p-0 m-0">{subMenu.label}</Col>
                                            }
                                        </Row>
                                    </Link>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
        );
    }
}