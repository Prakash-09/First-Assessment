import React from 'react';
import './Solutions.css';
import { Row, Col, Button, Card, Modal } from 'react-bootstrap';
import data from './SolutionsData';

const CARD_TYPE = {
    "firstcard": { label: "card-style1", image: require("../../assets/images/colour_card_cover.jpg") },
    "secondcard": { label: "card-style2", image: require("../../assets/images/colour_card_cover.jpg") },
    "thirdcard": { label: "card-style3", image: require("../../assets/images/colour_card_cover.jpg") },
    "fourthcard": { label: "card-style4", image: require("../../assets/images/colour_card_cover.jpg") },
}

export default class Solutions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            solutions: [],
            level: 0,
            showModal: false,
            selectedCardProperties: {},
            showProperties: false,
            configProperties: data.CONFIG_PROPERTIES,
        }
    }

    componentDidMount() {
        this.setState({ solutions: data.GET_SOLUTIONS })
    }
    closeModal() {
        this.setState({ showModal: false, configProperties: data.CONFIG_PROPERTIES, level: 0 })
    }
    handleClickOnCard(solution) {
        console.log(solution.name, "clicked")
    }
    createCard() {
        this.setState({ showModal: true })
    }
    handleFields(e) {
        let name = e.target.name;
        let val = e.target.value;
        console.log("name", name, "val", val)
        this.setState({
            configProperties: {
                ...this.state.configProperties,
                [name] : val
            }
        })
    }
    handleSelectCardBackground(card) {
        // document.getElementById("select-card-element").classList.add("selected-card-background")
        this.setState({
            configProperties: {
                ...this.state.configProperties,
                cardBackGround : card.cardBackGround
            }
        })
    }
    handleSubmit() {
        let config = this.state.configProperties;
        // e.preventDefault();
        // let config = solutionConfig
        // var uid = new Date().getTime();

        console.log("Submitted...", config)
        this.setState({ level: 0, showModal: false, configProperties: data.CONFIG_PROPERTIES })
    }
    render() {
        const { solutions, level, showModal, configProperties } = this.state;
        console.log("configProperties", configProperties)
        return (
            <div>
                {(level === 0) && 
                    <Row className="m-0 mb-2">
                        <Col className="p-0 text-left"><h5>Solutions ({solutions.length})</h5></Col>
                        <Col className="p-0 text-right">
                            <Button variant="primary" onClick={this.createCard.bind(this)}>Create</Button>
                        </Col>
                    </Row>
                }
                {solutions.length === 0 &&
                    <Row className="m-0">
                        <Col className="p-0">
                            Loading...
                        </Col>
                    </Row>
                }{((solutions.length > 0) && (level === 0)) &&
                    <Row xs="1" md="3" className="m-0">
                        {solutions.map((solution, solIdx) =>
                            <Col key={solIdx} className="p-2">
                                <Card className="card-container" style={{ backgroundImage: `url(${CARD_TYPE[solution.cardBackGround].image})` }} onClick={this.handleClickOnCard.bind(this, solution)}>
                                    <Card.Body className="pb-2 pr-2 body-card" >
                                        <h6><i className="fa fa-compass"></i> {solution.title}</h6>
                                        <p>{solution.name}</p>
                                        <small>{solution.description}</small>
                                    </Card.Body>
                                    <Card.Footer className="p-1">
                                        <Row className="m-0">
                                            <Col className="text-right p-0" >
                                                <i className="fa fa-angle-right close-properties-icon"></i>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )}
                    </Row>
                }
                {((solutions.length > 0) && (level === 1)) &&
                    <Row className="m-0">
                        <Col className="p-0">
                            New screen open when clicked on card
                        </Col>
                    </Row>
                }
                <Modal show={showModal} onHide={this.closeModal.bind(this)} size="lg">
                    <Modal.Header closeButton className="p-2">
                        <Modal.Title>Create solution</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="create-solution-modal-body">
                        <Row xs="1" md="2" className="m-0">
                            {data.PROPERTY_FIELDS.map((field, fieldIdx) =>
                                <div key={fieldIdx}>
                                    {field.type !== "textarea" &&
                                        <Col className="p-2">
                                            <p className="m-0">{field.label}</p>
                                            <input type={field.type} name={field.key} value={configProperties[field.key]} onChange={this.handleFields.bind(this)} className={`${field.type === "text" && "text-field"}`} />
                                        </Col>
                                    }{field.type === "textarea" &&
                                        <Col className="p-2">
                                            <p className="m-0">{field.label}</p>
                                            <textarea name={field.key} rows={field.rows} value={configProperties[field.key]} onChange={this.handleFields.bind(this)} className={`${field.type === "textarea" && "text-area-field"}`} />
                                        </Col>
                                    }
                                </div>
                            )}
                        </Row>
                        <div>
                            <p className="m-0 pl-2"> Select card </p>
                            <Row xs="1" md="2" className="m-0">
                                {data.CARD_BACKGROUND.map((card, cardIdx) =>
                                    <Col key={cardIdx} className="p-2">
                                        <Card id="select-card-element" className="select-card-container mr-1" style={{ backgroundImage: `url(${CARD_TYPE[card.cardBackGround].image})` }} onClick={this.handleSelectCardBackground.bind(this, card)}>
                                            <Card.Body className="pb-2 pr-2 body-card" >
                                                <h6>{card.title}</h6>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                            </Row>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="create-modal-footer p-2">
                        <Button variant="primary" onClick={this.handleSubmit.bind(this)}
                            className={((configProperties.title.length > 0) && (configProperties.name.length > 0) && (configProperties.description.length > 0) && (configProperties.cardBackGround.length > 0)) ? "valid-button" : "invalid-button" }
                        > 
                        Submit 
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}