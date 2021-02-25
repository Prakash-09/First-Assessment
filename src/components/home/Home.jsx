import React, { Component } from 'react';
import './Home.css';
import cardHeaderImg from '../../assets/images/trust_simplicity.svg';
import coverImg from '../../assets/images/colour_card_cover.jpg';
import { Row, Col, Card } from 'react-bootstrap';
import Data from '../json/HomeData';

// const PARTNERS = [
//     {
//         id: "partner1",
//         name: "aws",
//     },
//     {
//         id: "partner2",
//         name: "microsoft",
//     },
//     {
//         id: "partner3",
//         name: "google cloud",
//     },
//     {
//         id: "partner4",
//         name: "ibm",
//     },
//     {
//         id: "partner5",
//         name: "vmware",
//     }
// ]

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstBoxExpand: true,
            secondBoxExpand: false,
            thirdBoxExpand: false,
            fourthBoxExpand: false,
        }
    }

    // hoverSecondBox() {
    //     document.getElementById("first-box").classList.add("collapse-first-box-container")
    //     document.getElementById("second-box").classList.add("expand-second-box-container")
    // }
    // leaveSecondBox() {
    //     document.getElementById("second-box").classList.remove("expand-second-box-container")
    // }
    // hoverThirdBox() {
    //     document.getElementById("first-box").classList.add("collapse-first-box-container")
    //     document.getElementById("third-box").classList.add("expand-third-box-container")
    // }
    // leaveThirdBox() {
    //     document.getElementById("third-box").classList.remove("expand-third-box-container")
    // }
    // hoverFourthBox() {
    //     document.getElementById("first-box").classList.add("collapse-first-box-container")
    //     document.getElementById("fourth-box").classList.add("expand-fourth-box-container")
    // }
    // leaveFourthBox() {
    //     document.getElementById("fourth-box").classList.remove("expand-fourth-box-container")
    // }
    handleClickOnArrow(box) {
        console.log(box.title)
    }

    render() {
        return (
            <div className="cthree-component">
                <div className="p-1 box-heading">
                    <img src={cardHeaderImg} alt="header-img" height="15%" width="15%" />
                    <span className="pl-2">Hello Welcome</span>
                </div>
                <div className="box-container py-5 px-4 ">
                    <Row xs="1" md="1" className="m-0">
                        <Col className="p-0">
                            <div id="first-box" className="first-box-container px-4 py-3" >
                                <div>
                                    <span className="font-weight-bold">Intigrated development studio</span>
                                </div>
                                <Row xs="1" md="6" className="m-0 mt-3">
                                    {Data.BOX_DATA.FIRST_BOX_DATA.map((box, boxIdx) =>
                                        <Col key={boxIdx} className="p-0">
                                            <Card className="home-card-container mr-1" style={{ backgroundImage: `url(${coverImg})` }} onClick={this.handleClickOnArrow.bind(this, box)}>
                                                <Card.Body className="pb-2 pr-2 body-card" >
                                                    <h6><i className="fa fa-compass"></i> {box.title}</h6>
                                                    <small>{box.info}</small>
                                                </Card.Body>
                                                <Card.Footer className="p-1 home-footer">
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
                        <Col className="p-0 my-2">
                            <Row className="m-0">
                                <Col className="p-0">
                                    <div id="second-box" className="second-box-container px-4 py-3 mr-1" 
                                        // onMouseEnter={this.hoverSecondBox.bind(this)} onMouseLeave={this.leaveSecondBox.bind(this)}
                                    >
                                        <div>
                                            <span className="font-weight-bold">Intigrated development studio</span>
                                        </div>
                                        <Row xs="1" md="2" className="m-0 mt-3">
                                            {Data.BOX_DATA.SECOND_BOX_DATA.map((box, boxIdx) =>
                                                <Col key={boxIdx} className="p-0">
                                                    <Card className="home-card-container mr-1" style={{ backgroundImage: `url(${coverImg})` }} onClick={this.handleClickOnArrow.bind(this, box)}>
                                                        <Card.Body className="pb-2 pr-2 body-card" >
                                                            <h6><i className="fa fa-compass"></i> {box.title}</h6>
                                                            <small>{box.info}</small>
                                                        </Card.Body>
                                                        <Card.Footer className="p-1 home-card-footer">
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
                                <Col className="p-0">
                                    <div id="third-box" className="third-box-container px-4 py-3 ml-1" 
                                        // onMouseEnter={this.hoverThirdBox.bind(this)} onMouseLeave={this.leaveThirdBox.bind(this)}
                                    >
                                        <div>
                                            <span className="font-weight-bold">Intigrated development studio</span>
                                        </div>
                                        <Row xs="1" md="2" className="m-0 mt-3">
                                            {Data.BOX_DATA.THIRD_BOX_DATA.map((box, boxIdx) =>
                                                <Col key={boxIdx} className="p-0">
                                                    <Card className="home-card-container mr-1" style={{ backgroundImage: `url(${coverImg})` }} onClick={this.handleClickOnArrow.bind(this, box)}>
                                                        <Card.Body className="pb-2 pr-2 body-card" >
                                                            <h6><i className="fa fa-compass"></i> {box.title}</h6>
                                                            <small>{box.info}</small>
                                                        </Card.Body>
                                                        <Card.Footer className="p-1 home-card-footer">
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
                            </Row>
                        </Col>
                        <Col className="p-0">
                            <div id="fourth-box" className="fourth-box-container px-4 py-3" 
                                // onMouseEnter={this.hoverFourthBox.bind(this)} onMouseLeave={this.leaveFourthBox.bind(this)}
                            >
                                <div>
                                    <span className="font-weight-bold">Intigrated development studio</span>
                                </div>
                                <Row xs="1" md="6" className="m-0 mt-3">
                                    {Data.BOX_DATA.FOURTH_BOX_DATA.map((box, boxIdx) =>
                                        <Col key={boxIdx} className="p-0">
                                            <Card className="home-card-container mr-1" style={{ backgroundImage: `url(${coverImg})` }} onClick={this.handleClickOnArrow.bind(this, box)}>
                                                <Card.Body className="pb-2 pr-2 body-card" >
                                                    <h6><i className="fa fa-compass"></i> {box.title}</h6>
                                                    <small>{box.info}</small>
                                                </Card.Body>
                                                <Card.Footer className="p-1 home-card-footer">
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
                    </Row>
                </div>
                {/* <div className="partners-container mt-5 p-3">
                    <Row xs="1" md="5">
                        {PARTNERS.map((partner, partnerIdx) =>
                            <Col key={partnerIdx}>
                                <div>{partner.name}</div>
                            </Col>
                        )}
                    </Row>
                </div> */}
            </div>
        );
    }
}
export default Home;