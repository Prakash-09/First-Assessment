import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Route, Link } from "react-router-dom";
import coverImg from '../../assets/images/colour_card_cover.jpg';
import './Site.css';
import siteData from './SiteData';
import SideNav from '../sidenav/SideNav';
import Blueprint from '../blueprint/Blueprint';


export default class Site extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sites: [],
            loading: true,
            level: 0,
            routeData: [],
            selectedSiteCard: {},
            hoverOnSideNav: false,
            childRoute: [],
        }
    }

    componentDidMount() {
        this.setState({ sites: siteData.GET_SITE_DATA, loading: false })
    }
    addFieldCard() {
        let sites = this.state.sites;
        let uid = new Date().getTime();
        let fieldObj = {
            id: uid,
            key: "field" + uid,
            title: "Field",
            full: [],
            split: [],
        }
        sites.push(fieldObj)

        this.setState({ sites: sites })
    }
    handleExplore(site) {
        console.log("site", site)
        let routeData = this.state.routeData;
        // let childRoute = this.state.childRoute;
        // let fullObjIds = site.full.map(fullObj => {return fullObj.id})
        // let tested = childRoute?.filter(item =>  fullObjIds.map(objId => objId === item.id.split(" ")[1] ))
        
        // console.log("tested", tested)
        let routeObj = {
            id: "field " + site.id,
            to: "/" + site.title.replace(/ /g, "") + site.id,
            exact: true,
            label: site.title,
            component: Blueprint,
            icon: "fa fa-home",
            type: "item",
            children: []
        }
        routeData = []
        routeData.push(routeObj)
        this.setState({ selectedSiteCard: site, level: 1, routeData: routeData }) 
    }
    mouseEnter() {
        this.setState({ hoverOnSideNav: true })
    }
    mouseLeave() {
        this.setState({ hoverOnSideNav: false })
    }
    levelAsProp(val) {
        this.setState({ level: val, hoverOnSideNav: false })
    }
    addTopicToSideNav(topic) {
        let routeData = this.state.routeData;
        let childRoute = this.state.childRoute;
        let selectedSiteCard = this.state.selectedSiteCard;
        let routeChildObj = {
            id: "field " + topic.id,
            label: topic.title,
            icon: "fa fa-arrows-alt",
            type: "collapse",
            children: []
        }
        let filteredRoute = routeData.filter(route => route.id.toLowerCase().replace(/ /g, "") === selectedSiteCard.key)[0]
        filteredRoute.children.push(routeChildObj)
        childRoute.push(routeChildObj)
        this.setState({ routeData: routeData, childRoute: childRoute })
    }
    
    render() {
        let { loading, level, sites, selectedSiteCard, routeData } = this.state;
        console.log("routeData", routeData)
        
        const menu = routeData.map((route, routeIdx) => {
            return (route.component) && (
                <Route
                    key={routeIdx}
                    path={route.to}
                    exact={route.exact}
                    name={route.label}
                    render={props => <route.component {...props} addTopicToSideNav={this.addTopicToSideNav.bind(this)} selectedSiteCard={selectedSiteCard} />}
                />
            )
        })
        return (
            <div>
                {loading &&
                    <Row className="m-0">
                        <Col className="p-0 text-center">
                            Loading...
                        </Col>
                    </Row>
                }
                {!loading && level === 0 &&
                    <div>
                        <Row className="m-0 p-3">
                            <Col className="p-0">
                            </Col>
                            <Col className="p-0 text-right">
                                <Button size="sm" variant="primary" onClick={this.addFieldCard.bind(this)}>+ Add site</Button>
                            </Col>
                        </Row>
                        <Row className="m-0" xs="1" md="3">
                            {sites?.map((site, siteIdx) =>
                                <Col key={siteIdx} className="p-3">
                                    <Card className="site-card-container" style={{ backgroundImage: `url(${coverImg})` }}>
                                        <Card.Body className="py-1 px-1">
                                            <Row className="m-0">
                                                <Col className="p-0 text-center">
                                                    <div className="font-weight-bold">{site.title}</div>
                                                    <small>{site.id}</small>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer className="py-1 px-1 site-card-footer">
                                            <Row className="m-0">
                                                <Col className="p-0 text-right">
                                                    <Link to={`/${site.title.replace(/ /g, "") + site.id}`} >
                                                        <small className="text-light explore-label-icon" onClick={this.handleExplore.bind(this, site)}>Explore <i className="fa fa-angle-double-right" /></small>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </div>
                }
                { level === 1 &&
                    <div>
                        <div className="side-nav-content shadow" onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
                            <SideNav
                                hoverOnSideNav={this.state.hoverOnSideNav}
                                selectedSiteCard={selectedSiteCard}
                                level={this.levelAsProp.bind(this)}
                                routeData={routeData}
                            />
                        </div>
                        <div className="components-content py-2">
                            {menu}
                        </div>
                    </div>
                }
            </div>
        );
    }
}