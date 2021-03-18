import React, { Component } from 'react';
import './Blueprint.css';
import { Link } from "react-router-dom";
import cardHeaderImg from '../../assets/images/trust_simplicity.svg';
import coverImg from '../../assets/images/colour_card_cover.jpg';
import { Row, Col, Button, Card } from 'react-bootstrap';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            siteCardData: this.props.selectedSiteCard,
            showFullSplitBtns: false,
            selectedSubTopic: {},
            isShowSections: false,
        }
    }
    addBlock(type) {
        let siteCardData = this.state.siteCardData;
        let uid = new Date().getTime();

        let blockObj = {
            blockId: "block" + uid,
            type: type,
            blockData: []
        }
        let topicOneObj = {
            id: type + uid + "one",
            key: "topic" + uid + "one",
            title: "Topic Name",
            cardsData: []
        }
        let topicTwoObj = {
            id: type + uid + "two",
            key: "topic" + uid + "two",
            title: "Topic Name",
            cardsData: []
        }

        if (type === "full") {
            blockObj.blockData.push(topicOneObj)
            siteCardData.data.push(blockObj)
            let block = siteCardData.data.filter(blockItem => blockItem.blockId === blockObj.blockId)[0]
            let blockDataObj = block.blockData.filter(blockDataItem => blockDataItem.id === topicOneObj.id)[0]
            this.props.addTopicToSideNav(blockDataObj, type)
        } else {
            blockObj.blockData.push(topicOneObj, topicTwoObj)
            siteCardData.data.push(blockObj)
            let block = siteCardData.data.filter(blockItem => blockItem.blockId === blockObj.blockId)[0]
            let blockDataObj = block.blockData.filter(blockDataItem => blockDataItem.id === topicOneObj.id)[0]
            let blockDataObjTwo = block.blockData.filter(blockDataItem => blockDataItem.id === topicTwoObj.id)[0]
            this.props.addTopicToSideNav(blockDataObj, type, blockDataObjTwo)
        }
        this.setState({
            siteCardData: siteCardData,
            showFullSplitBtns: false
        })
    }
    addAdditionalSplitBlock(block) {
        let siteCardData = this.state.siteCardData;
        let selectedSplitBlock = siteCardData.data.filter(data => data.blockId === block.blockId)[0]
        let uid = new Date().getTime();
        let additionalSplitBlockObj = {
            id: block.type + uid + "additional",
            key: "topic" + uid + "additional",
            title: "Topic Name",
            cardsData: []
        }

        selectedSplitBlock.blockData.push(additionalSplitBlockObj)
        let blockObj = siteCardData.data.filter(blockItem => blockItem.blockId === block.blockId)[0]
        let blockDataObj = blockObj.blockData.filter(blockDataItem => blockDataItem.id === additionalSplitBlockObj.id)[0]

        this.props.addTopicToSideNav(blockDataObj, block.type)
        this.setState({ siteCardData: siteCardData })
    }
    addSubTopic(block, blockDataObj) {
        let siteCardData = this.state.siteCardData
        let uid = new Date().getTime();
        let selectedBlock = siteCardData.data.filter(blockObj => blockObj.blockId === block.blockId)[0]
        let selectedBlockData = selectedBlock.blockData.filter(dataObj => dataObj.id === blockDataObj.id)[0]

        let cardObj = {
            id: uid.toString(),
            key: "subtopic" + uid,
            title: "Sub topic",
            description: "Sub topic description here",
            sections: [],
        }
        selectedBlockData.cardsData.push(cardObj)

        let subTopicCard = selectedBlockData.cardsData.filter(subTopic => subTopic.id === cardObj.id)[0]
        this.props.addSubTopicToSideNav(subTopicCard, blockDataObj)

        this.setState({
            siteCardData: siteCardData
        })
    }

    render() {
        let { siteCardData, showFullSplitBtns, isShowSections } = this.state;
        return (
            <div>
                {!isShowSections &&
                    <div className="cthree-component">
                        <div className="p-1 box-heading">
                            <img src={cardHeaderImg} alt="header-img" height="15%" width="15%" />
                            <span className="pl-2">Hello Welcome</span>
                        </div>
                        <div className="box-container py-3 px-4 ">
                            <Row xs="1" md="1" className="m-0">
                                <Col className="p-0 text-right">
                                    <i className="fa fa-plus text-primary plus-icon" onClick={() => this.setState({ showFullSplitBtns: true })} />
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
                            {siteCardData.data.map((block, blockIdx) =>
                                <Row key={blockIdx} className="m-0">
                                    {block.blockData.map((blockDataObj, blockDataObjIdx) =>
                                        <Col key={blockDataObjIdx} className="p-2">
                                            <div className="block-container p-3">
                                                <Row xs="1" md="2" className="m-0">
                                                    <Col className="p-0">
                                                        <span className="font-weight-bold">{blockDataObj.title}</span>
                                                    </Col>
                                                    <Col className="p-0 text-right">
                                                            <i className="fa fa-plus plus-icon" onClick={this.addSubTopic.bind(this, block, blockDataObj)} />
                                                    </Col>
                                                </Row>
                                                <Row xs="1" md={block.type === "full" ? "6" : "2"} className="m-0 mt-2">
                                                    {/* {console.log('cols', block.type === "full" ? "6" : block.blockData.length === "2" ? "3" : block.blockData.length === "3" ? "2" : "1")} */}
                                                    {blockDataObj.cardsData?.map((card, cardIdx) =>
                                                        <Col key={cardIdx} className="p-2">
                                                            <Link to={`/${siteCardData.title.replace(/ /g, "") + siteCardData.id + "/" + blockDataObj.title.replace(/ /g, "") + "/" + card.title.replace(/ /g, "") + card.id }`}>
                                                                <Card className="card-container-in-block mr-1" style={{ backgroundImage: `url(${coverImg})` }} >
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
                                                            </Link>
                                                        </Col>
                                                    )}
                                                </Row>
                                            </div>
                                        </Col>
                                    )}{block.type === "split" &&
                                        <div className="pt-4 plus-icon">
                                            <i className="fa fa-plus" onClick={this.addAdditionalSplitBlock.bind(this, block)} />
                                        </div>
                                    }
                                </Row>
                            )}
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default Home;