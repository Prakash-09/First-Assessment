import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Route, Link } from "react-router-dom";
import coverImg from '../../assets/images/colour_card_cover.jpg';
import './Site.css';
import siteData from './SiteData';
import SideNav from '../sidenav/SideNav';
import Blueprint from '../blueprint/Blueprint';
// import Sections from '../sections/Sections';

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
        let routeData = this.state.routeData;
        let routeObj

        routeObj = {
            id: "field " + site.id,
            to: "/" + site.title.replace(/ /g, "") + site.id,
            exact: true,
            label: site.title,
            component: Blueprint,
            icon: "fa fa-home",
            type: "item",
            children: []
        }
        if (site.full.length !== 0 || site.split.length !== 0) {

            let childrenArr = site.full.concat(site.split)
            for (const childrenArrObj of childrenArr) {
                let routeChildObj = {
                    id: "field " + childrenArrObj.id,
                    label: childrenArrObj.title,
                    icon: "fa fa-folder",
                    type: "collapse",
                    children: []
                }
                routeObj.children.push(routeChildObj)
            }
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
    addTopicToSideNav(topic, type, topicTwo) {
        console.log("topic, type, topicTwo", topic, type, topicTwo)
        let routeData = this.state.routeData;
        let selectedSiteCard = this.state.selectedSiteCard;
        let filteredRoute = routeData.filter(route => route.id.toLowerCase().replace(/ /g, "") === selectedSiteCard.key)[0]
        let routeChildObj = {
            id: "field " + topic.id,
            label: topic.title,
            icon: "fa fa-folder",
            type: "collapse",
            children: []
        }
        if (type === "full") {
            filteredRoute.children.push(routeChildObj)
        } else {
            if(topicTwo) {
                let routeChildObjTwo = {
                    id: "field " + topicTwo.id,
                    label: topicTwo.title,
                    icon: "fa fa-folder",
                    type: "collapse",
                    children: []
                }
                filteredRoute.children.push(routeChildObj, routeChildObjTwo)
            } else {
                filteredRoute.children.push(routeChildObj)
            }
        }
        console.log("routeData", routeData)
        this.setState({ routeData: routeData })
    }

    
    addSubTopicToSideNav(subTopic) {
        console.log("subTopic", subTopic)
    }

    render() {
        let { loading, level, sites, selectedSiteCard, routeData } = this.state;
        const menu = routeData.map((route, routeIdx) => {
            return (route.component) && (
                <Route
                    key={routeIdx}
                    path={route.to}
                    exact={route.exact}
                    name={route.label}
                    render={props => <route.component {...props} selectedSiteCard={selectedSiteCard} addTopicToSideNav={this.addTopicToSideNav.bind(this)} addSubTopicToSideNav={this.addSubTopicToSideNav.bind(this)} />}
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