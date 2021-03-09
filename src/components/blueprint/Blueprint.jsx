import React, { Component } from 'react';
import './Blueprint.css';
import cardHeaderImg from '../../assets/images/trust_simplicity.svg';
import coverImg from '../../assets/images/colour_card_cover.jpg';
import { Row, Col, Button, Card } from 'react-bootstrap';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            siteCardData: this.props.selectedSiteCard,
            showFullSplitBtns: false,
            addBlockType: '',
        }
    }
    handleClickOnArrow(box) {
        console.log(box.title)
    }
    addBlock(type) {
        let addBlockType = type;
        let siteCardData = this.state.siteCardData;
        let uid = new Date().getTime();
        let uuid = new Date().getTime();
        let blockObjOne = {
            id: uid,
            key: "topic" + uid,
            blockType: addBlockType,
            title: "Topic Name",
            cardsData: [],
        }
        let blockObjTwo = {
            id: uuid + "sec",
            key: "topic" + uuid + "sec",
            blockType: addBlockType,
            title: "Topic Name",
            cardsData: [],
        }

        if (addBlockType === "full") {
            siteCardData["full"].push(blockObjOne)
        }
        if (addBlockType === "split") {
            siteCardData["split"].push(blockObjOne, blockObjTwo)
        }
        let addedBlock = siteCardData[addBlockType].filter(block => block.id === blockObjOne.id)[0]
        this.props.addTopicToSideNav(addedBlock)

        this.setState({
            addBlockType: addBlockType,
            siteCardData: siteCardData,
            showFullSplitBtns: false
        })
    }
    addCardsInBlock(block) {
        let siteCardData = this.state.siteCardData
        let uid = new Date().getTime();
        // console.log("block", block)
        let selectedBlock = siteCardData[block.blockType].filter(blockObj => blockObj.id === block.id)[0]
        let cardObj = {
            id: uid,
            key: "subtopic" + uid,
            title: "Sub topic",
            description: "Sub topic description here",
        }
        selectedBlock.cardsData.push(cardObj)
        this.setState({
            siteCardData: siteCardData
        })
    }

    render() {
        let { siteCardData, showFullSplitBtns } = this.state;
        console.log("siteCardData", siteCardData)
        return (
            <div className="cthree-component">
                <div className="p-1 box-heading">
                    <img src={cardHeaderImg} alt="header-img" height="15%" width="15%" />
                    <span className="pl-2">Hello Welcome</span>
                </div>
                <div className="box-container py-3 px-4 ">
                    <Row xs="1" md="1" className="m-0">
                        <Col className="p-0 text-right">
                            <Button size="sm" variant="outline-dark" onClick={() => this.setState({ showFullSplitBtns: true })}> <i className="fa fa-plus" /> Add Block </Button>
                            {showFullSplitBtns &&
                                <Row className="m-0 mt-1">
                                    <Col className="p-0 text-right">
                                        <div className="float-right full-split-container">
                                            <Button className="m-1" size="sm" variant="outline-dark" onClick={this.addBlock.bind(this, "full")}>Full</Button>
                                            <Button className="m-1" size="sm" variant="outline-dark" onClick={this.addBlock.bind(this, "split")}>Split</Button>
                                        </div>
                                    </Col>
                                </Row>
                            }
                        </Col>
                    </Row>
                    <Row xs="1" md="1" className="m-0 mt-3 ">
                        {siteCardData.full?.map((block, blockIdx) =>
                            <Col key={blockIdx} className="p-1 mb-2">
                                <div className="block-container p-3">
                                    <Row xs="1" md="2" className="m-0">
                                        <Col className="p-0">
                                            <span className="font-weight-bold">{block.title}</span>
                                        </Col>
                                        <Col className="p-0 text-right">
                                            <div className="float-right add-icon-label" onClick={this.addCardsInBlock.bind(this, block)}>
                                                <i className="fa fa-plus" /> <span>Card</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row xs="1" md="6" className="m-0 mt-2">
                                        {block.cardsData?.map((card, cardIdx) =>
                                            <Col key={cardIdx} className="p-2">
                                                <Card className="card-container-in-block mr-1" style={{ backgroundImage: `url(${coverImg})` }} onClick={this.handleClickOnArrow.bind(this, card)}>
                                                    <Card.Body className="pb-2 pr-2 card-body-in-block" >
                                                        <h6><i className="fa fa-compass"></i> {card.title}</h6>
                                                        <small>{card.description}</small>
                                                    </Card.Body>
                                                    <Card.Footer className="p-1 card-footer-in-block">
                                                        <Row className="m-0">
                                                            <Col className="text-right p-0" >
                                                                <i className="fa fa-angle-right"></i>
                                                            </Col>
                                                        </Row>
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                        )}
                                    </Row>
                                </div>
                            </Col>
                        )}
                    </Row>
                    <Row xs="1" md="2" className="m-0 mt-3 ">
                        {siteCardData.split?.map((block, blockIdx) =>
                            <Col key={blockIdx} className="p-1 mb-2">
                                <div className="block-container p-3">
                                    <Row xs="1" md="2" className="m-0">
                                        <Col className="p-0">
                                            <span className="font-weight-bold">{block.title}</span>
                                        </Col>
                                        <Col className="p-0 text-right">
                                            <div className="float-right add-icon-label" onClick={this.addCardsInBlock.bind(this, block)}>
                                                <i className="fa fa-plus" /> <span>Card</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row xs="1" md="3" className="m-0 mt-2">
                                        {block.cardsData.map((card, cardIdx) =>
                                            <Col key={cardIdx} className="p-2">
                                                <Card className="card-container-in-block mr-1" style={{ backgroundImage: `url(${coverImg})` }} onClick={this.handleClickOnArrow.bind(this, card)}>
                                                    <Card.Body className="pb-2 pr-2 card-body-in-block" >
                                                        <h6><i className="fa fa-compass"></i> {card.title}</h6>
                                                        <small>{card.description}</small>
                                                    </Card.Body>
                                                    <Card.Footer className="p-1 card-footer-in-block">
                                                        <Row className="m-0">
                                                            <Col className="text-right p-0" >
                                                                <i className="fa fa-angle-right"></i>
                                                            </Col>
                                                        </Row>
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                        )}
                                    </Row>
                                </div>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>
        );
    }
}
export default Home;