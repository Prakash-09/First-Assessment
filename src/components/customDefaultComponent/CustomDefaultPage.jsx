import React from 'react';
import pageData from './DefaultPageData';
import { Row, Col, Card } from 'react-bootstrap';
import conceptImg from '../../assets/images/consumability.svg';
import forThreeSimilarSectionsCardsImg from '../../assets/images/certified_by.svg';
import './CustomDefaultPage.css';

const CARD_BACKGROUND = {
    "purple-card": { id: "cardBg-1", label: "Purple-card-cover", image: require("../../assets/images/colour_card_cover.jpg") },
}

export default class CustomDefaultPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            urlPath: this.props.location.pathname,
            pageTemplate: [],
            selectedSection: '',
            sectionData: {},
        }
    }
    componentDidMount() {
        let sectionData = this.state.sectionData;
        let urlPath = this.state.urlPath.slice(1).toLowerCase()
        sectionData = pageData.GET_PAGE_DATA[urlPath] ? pageData.GET_PAGE_DATA[urlPath] : pageData.GET_PAGE_DATA[urlPath] = {
            "Concepts": [],
            "Path_Ways": [],
            "Open_Source": [],
            "Companies": [],
            "Influencers": [],
        }
        this.setState({
            pageTemplate: pageData.GET_PAGE_TEMPLATE.PageOneTemplate.sections,
            sectionData: sectionData
        })
    }
    handleAddCardOnSection(section) {
        let sectionName = section.replace(/ /g, "_");
        let sectionData = this.state.sectionData;
        let uid = new Date().getTime();
        let cardData = {
            id: uid,
            key: section + uid,
            type: section,
            title: "Enter Title",
            description: "",
            multimedia: "",
            background: "purple-card",
            date: "30Jun21",
            fav: false
        }
        sectionData[sectionName].push(cardData)
        this.setState({ selectedSection: section, sectionData: sectionData })
    }
    render() {
        const { pageTemplate, sectionData } = this.state;
        console.log("sectionData", sectionData)
        return (
            <div>
                {pageTemplate.map((section, sectionIdx) =>
                    <div key={sectionIdx} className="p-2">
                        <Row className="m-0 mt-3" xs="2" md="2">
                            <Col className="p-0 text-left"><h5>{section}</h5></Col>
                            <Col className="p-0 text-right"><i className="fa fa-plus section-plus-icon" onClick={this.handleAddCardOnSection.bind(this, section)} ></i></Col>
                        </Row>
                        <Row className="m-0" xs="1" md="3">
                            {sectionData[section.replace(/ /g, "_")].map((sectionCard, sectionCardIdx) =>
                                <Col className="p-3" key={sectionCardIdx}>

                                    {section !== "Path Ways" &&
                                        <Card className="custom-card" style={{ backgroundImage: `url(${CARD_BACKGROUND[sectionCard.background].image})` }}>
                                            <Card.Body className="px-2 pt-2 pb-0">
                                                <Row className="m-0">
                                                    <Col xs="2" className="p-0 img-col">
                                                        <img src={`${sectionCard.type === "Concept" ? conceptImg : forThreeSimilarSectionsCardsImg}`} alt={sectionCard.type} height="100%" width="100%" />
                                                    </Col>
                                                    <Col xs="10" className="p-0 pl-3 ">
                                                        <small className="m-0 font-weight-bold text-muted"> {section === "Concepts" && sectionCard.type.toUpperCase()}</small>
                                                        <h6>{sectionCard.title}</h6>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                            <Card.Footer className="px-2 py-0">
                                                <Row className="m-0">
                                                    <Col className="text-right p-0" >
                                                        <i className="fa fa-angle-right close-properties-icon"></i>
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                    }
                                </Col>
                            )}
                        </Row>
                    </div>
                )}
            </div>
        );
    }
}