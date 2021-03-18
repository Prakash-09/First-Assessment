import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Route, Link } from "react-router-dom";
import coverImg from '../../assets/images/colour_card_cover.jpg';
import './Site.css';
import siteData from './SiteData';
import SideNav from '../sidenav/SideNav';
import Blueprint from '../blueprint/Blueprint';
import Sections from '../sections/Sections';

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
            activeItem: '',
        }
    }

    componentDidMount() {
        this.setState({ sites: siteData.GET_SITE_DATA, loading: false })
    }
    addFieldCard() {
        let sites = this.state.sites;
        let uid = new Date().getTime();
        let siteObj = {
            id: uid.toString(),
            key: "site" + uid,
            title: "Work Space",
            data: []
        }
        sites.push(siteObj)

        this.setState({ sites: sites })
    }
    handleExplore(site) {
        let routeData = this.state.routeData;
        let routeObj

        routeObj = {
            id: "site " + site.id,
            to: "/" + site.title.replace(/ /g, "") + site.id,
            exact: true,
            label: site.title,
            component: Blueprint,
            icon: "fa fa-home",
            type: "item",
            children: []
        }
        if (site.data.length !== 0) {
            for (const dataObj of site.data) {
                for (const blockDataObj of dataObj.blockData) {
                    let routeChildObj = {
                        id: "site " + blockDataObj.id,
                        label: blockDataObj.title,
                        icon: "fa fa-folder",
                        type: "collapse",
                        children: []
                    }
                    routeObj.children.push(routeChildObj)
                    if(blockDataObj.cardsData.length !== 0){
                        for (const cardsDataObj of blockDataObj.cardsData) {
                            let routeSubChildObj = {
                                id: "field " + cardsDataObj.id,
                                to: "/" + site.title.replace(/ /g, "") + site.id + "/" + routeChildObj.label.replace(/ /g, "") + "/" + cardsDataObj.title.replace(/ /g, "") + cardsDataObj.id,
                                exact: true,
                                label: cardsDataObj.title,
                                component: Sections,
                                icon: "fa fa-file",
                                type: "item",
                            }
                            routeChildObj.children.push(routeSubChildObj)
                        }
                    }
                }
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
        let routeData = this.state.routeData;
        let selectedSiteCard = this.state.selectedSiteCard;
        let routeObj = routeData.filter(route => route.id.toLowerCase().replace(/ /g, "") === selectedSiteCard.key)[0]
        let routeChildObj = {
            id: "site " + topic.id,
            label: topic.title,
            icon: "fa fa-folder",
            type: "collapse",
            children: []
        }

        if (type === "full") {
            routeObj.children.push(routeChildObj)
        } else {
            if (topicTwo) {
                let routeChildObjTwo = {
                    id: "site " + topicTwo.id,
                    label: topicTwo.title,
                    icon: "fa fa-folder",
                    type: "collapse",
                    children: []
                }
                routeObj.children.push(routeChildObj, routeChildObjTwo)
            } else {
                routeObj.children.push(routeChildObj)
            }
        }

        this.setState({ routeData: routeData })
    }
    addSubTopicToSideNav(subTopic, blockDataObj) {
        let routeData = this.state.routeData;
        let selectedSiteCard = this.state.selectedSiteCard;
        let lvOneRoute = routeData.filter(route => route.id.toLowerCase().replace(/ /g, "") === selectedSiteCard.key)[0]
        let lvTwoRoute = lvOneRoute.children.filter(childRoute => childRoute.id.split(" ")[1] === blockDataObj.id)[0]

        let routeSubChildObj = {
            id: "site " + subTopic.id,
            to: "/" + selectedSiteCard.title.replace(/ /g, "") + selectedSiteCard.id + "/" + lvTwoRoute.label.replace(/ /g, "") + "/" + subTopic.title.replace(/ /g, "") + subTopic.id,
            exact: true,
            label: subTopic.title,
            component: Sections,
            icon: "fa fa-file",
            type: "item",
        }

        lvTwoRoute.children.push(routeSubChildObj)
        this.setState({ routeData: routeData })
    }

    render() {
        let { loading, level, sites, selectedSiteCard, routeData } = this.state;
        const renderMenuComponents = routeData.map((route, routeIdx) => {
            return (route.component) && (
                <Route
                    key={routeIdx}
                    path={route.to}
                    exact={route.exact}
                    name={route.label}
                    render={props => <route.component {...props} 
                        selectedSiteCard={selectedSiteCard} 
                        addTopicToSideNav={this.addTopicToSideNav.bind(this)} 
                        addSubTopicToSideNav={this.addSubTopicToSideNav.bind(this)}
                    />}
                />
            )
        })
        const renderSubMenuComponents = routeData.map(route =>{
            return route.children && 
            route.children.map(subRoute =>{
                return subRoute.children  && 
                subRoute.children.map((subChildRoute, subChildRouteIdx) => {
                    return (subChildRoute.component) && (
                        <Route
                            key={subChildRouteIdx}
                            path={subChildRoute.to}
                            exact={subChildRoute.exact}
                            name={subChildRoute.label}
                            render={props => <subChildRoute.component {...props} 
                                selectedSiteCard={selectedSiteCard}
                            />}
                        />
                    )
                })
            })
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
                                <h5>Mind Space</h5>
                            </Col>
                            <Col className="p-0 text-right">
                                <i className="fa fa-plus text-primary plus-icon" onClick={this.addFieldCard.bind(this)} />
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
                            {renderMenuComponents}
                            {renderSubMenuComponents}
                        </div>
                    </div>
                }
            </div>
        );
    }
}