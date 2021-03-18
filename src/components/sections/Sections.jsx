import React from 'react';
import './Sections.css';
import { Row, Col, Card } from 'react-bootstrap';
import basicCardImg from '../../assets/images/consumability.svg';
import forImgCard from '../../assets/images/laptop.jpg';
import forVideoCard from '../../assets/images/narrow_road_video.mp4';

const CARD_BACKGROUND = {
    "purple-card": { id: "cardBg-1", label: "Purple-card-cover", image: require("../../assets/images/colour_card_cover.jpg") },
}

export default class Sections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subTopic: {},
            selectCardType: "",
        }
    }
    componentDidMount() {
        let subTopic = this.state.subTopic;
        let path = this.props.match.path
        let lastSegment = path.split('/').pop().toLowerCase()
        let selectedSiteCard = this.props.selectedSiteCard.data

        for (const dataObj of selectedSiteCard) {
            for (const blockDataObj of dataObj.blockData) {
                for (const subTopicObj of blockDataObj.cardsData) {
                    if (lastSegment === subTopicObj.key) {
                        subTopic = subTopicObj
                    }
                }
            }
        }
        this.setState({ subTopic: subTopic })
    }
    addSections() {
        let subTopic = this.state.subTopic;
        let uid = new Date().getTime();
        let sectionObj = {
            id: uid.toString(),
            key: "section" + uid,
            title: "Section Name",
            sectionsData: {},
        }
        subTopic.sections.push(sectionObj)
        this.setState({ subTopic: subTopic })
    }
    handleChangeCardType(section, e) {
        let subTopic = this.state.subTopic;
        let val = e.target.value;
        let selectedSection = subTopic.sections.filter(item => item.id === section.id)[0]
        let uid = new Date().getTime();
        let cardObj = {
            type: val,
            sectionsCardData: [],
        }
        let cardDataObj = {
            id: uid.toString(),
            key: val + uid,
            type: val,
            title: "Enter Title",
            description: "Enter description",
            multimedia: val,
            background: "purple-card",
            date: "17Mar21",
            fav: true
        }
        cardObj.sectionsCardData.push(cardDataObj)
        selectedSection.sectionsData = cardObj
        this.setState({
            subTopic: subTopic
        })
    }
    addSelectedTypeCard(section) {
        let subTopic = this.state.subTopic;
        let selectedSection = subTopic.sections.filter(item => item.id === section.id)[0]
        let uid = new Date().getTime();
        let cardDataObj = {
            id: uid.toString(),
            key: selectedSection.sectionsData.type + uid,
            type: selectedSection.sectionsData.type,
            title: "Enter Title",
            description: "Enter description",
            multimedia: selectedSection.sectionsData.type,
            background: "purple-card",
            date: "17Mar21",
            fav: false
        }
        selectedSection.sectionsData.sectionsCardData.push(cardDataObj)
        this.setState({
            subTopic: subTopic
        })
    }

    render() {
        let { subTopic } = this.state;
        return (
            <div className="p-2">
                <Row className="m-0">
                    <Col className="p-0 text-left"> {this.state.subTopic.key} </Col>
                    <Col className="p-0 text-right">
                        <i className="fa fa-plus text-primary plus-icon" onClick={this.addSections.bind(this)} />
                    </Col>
                </Row>
                <Row xs="1" md="1" className="m-0">
                    {subTopic.sections?.map((section, sectionIdx) =>
                        <Col className="p-0 pt-3" key={sectionIdx}>
                            <Row xs="2" md="2" className="m-0">
                                <Col className="p-0 text-left">
                                    <h5 className="m-0">{section.title}</h5>
                                </Col>
                                <Col className="p-0 text-right">
                                    {Object.keys(section.sectionsData).length === 0 ?
                                        <select value="" onChange={this.handleChangeCardType.bind(this, section)}>
                                            <option value="" disabled>+</option>
                                            <option value="basic">Basic</option>
                                            <option value="text">Text</option>
                                            <option value="image">Image</option>
                                            <option value="video">Video</option>
                                        </select>
                                        : <i className="fa fa-plus text-primary plus-icon" onClick={this.addSelectedTypeCard.bind(this, section)} />
                                    }
                                </Col>
                            </Row>
                            <Row xs="1" md="3" className='m-0'>
                                {section.sectionsData.sectionsCardData?.map((sectionCard, sectionCardIdx) =>
                                    <Col key={sectionCardIdx} className="p-3">
                                        {sectionCard.multimedia === "basic" &&
                                            <Card className="basic-card" style={{ backgroundImage: `url(${CARD_BACKGROUND[sectionCard.background].image})` }}>
                                                <Card.Body className="p-2 pb-0">
                                                    <Row className="m-0">
                                                        <Col xs="2" className="p-0 basic-img-col">
                                                            <img src={basicCardImg} alt="basic-card-img" height="100%" width="100%" />
                                                        </Col>
                                                        <Col xs="10" className="p-0 pl-3">
                                                            <small className="m-0 font-weight-bold text-muted">{sectionCard.type.toUpperCase()}</small>
                                                            <h6>{sectionCard.title}</h6>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        }{sectionCard.multimedia !== "basic" &&
                                            <Card className="custom-card" style={{ backgroundImage: `url(${CARD_BACKGROUND[sectionCard.background].image})` }}>
                                                <Card.Body className="p-2">
                                                    <div className="img-text-video-container text-center my-1">
                                                        {sectionCard.multimedia === "text" && <h6>A Sample text </h6>}
                                                        {sectionCard.multimedia === "image" && <img src={forImgCard} alt="card-type-img" width="100%" height="100%" />}
                                                        {sectionCard.multimedia === "video" && <video width="100%" height="100%" controls><source src={forVideoCard} type="video/mp4"/></video>}
                                                    </div>
                                                    <Row className="m-0">
                                                        <Col className="p-0 text-left"><i className="fa fa-adjust" /> <span className="font-weight-bold">{sectionCard.title}</span></Col>
                                                        <Col className="p-0 text-left"><span>{sectionCard.date}</span></Col>
                                                        <Col className="p-0 text-right"><span>{sectionCard.fav? <i className="fa fa-star" /> : <i className="fa fa-star-o" />}</span></Col>
                                                    </Row>
                                                    <Row className="m-0">
                                                        <Col className="p-0">{sectionCard.description}</Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        }
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    )}
                </Row>
            </div>
        );
    }
}