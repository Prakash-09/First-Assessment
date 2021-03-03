import React from 'react';
import './Environments.css';
import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
import data from './EnvironmentsData';
import backgroundImg from '../../assets/images/colour_card_cover.jpg';
import conceptImg from '../../assets/images/consumability.svg';
import forThreeSimilarSectionsCardsImg from '../../assets/images/certified_by.svg';

export default class Environments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            level: 0,
            concepts: [],
            conceptsConfig: {
                id: "",
                key: "",
                type: "CONCEPT",
                qst: "",
            },
            showConceptModal: false,
            threeSimilarSections: {},
            threeSimilarSectionsConfig: {
                id: "",
                key: "",
                type: "",
                description: "",
            },
            showThreeSimilarSectionsModal: false,
            selectedSectionModalHeading: "",
        }
    }
    componentDidMount() {
        this.setState({
            concepts: data.GET_CONCEPT_CARDS_DATA,
            loading: false,
            threeSimilarSections: data.GET_THREE_SIMILAR_SECTIONS_CARDS_DATA,
        })
    }

    // HANDLE CONCEPTS SECTION
    handleConceptModal() {
        this.setState({ showConceptModal: true })
    }
    closeConceptModal() {
        this.setState({ 
            conceptsConfig: {
                ...this.state.conceptsConfig,
                id: "",
                key: "",
                type: "CONCEPT",
                qst: "",
            },
            showConceptModal: false
        })
    }
    handleConceptConfigField(e) {
        let name = e.target.name;
        let val = e.target.value;
        this.setState({
            conceptsConfig: {
                ...this.state.conceptsConfig,
                [name]: val
            }
        })
    }
    submitConceptCardInfo() {
        let conceptsConfig = this.state.conceptsConfig;
        let concepts = this.state.concepts
        let uid = new Date().getTime();

        conceptsConfig.id = uid;

        concepts.push(conceptsConfig)

        this.setState({
            concepts: concepts,
            conceptsConfig: {
                ...this.state.conceptsConfig,
                id: "",
                key: "",
                type: "CONCEPT",
                qst: "",
            },
            level: 0, showConceptModal: false
        })
    }

    // HANDLE THREE SIMILAR SECTIONS WHICH ARE "OPEN SOURCE, COMPANIES, INFLUENCERS"
    handleSimilarSectionsModal(similarSec) {
        this.setState({
            showThreeSimilarSectionsModal: true,
            selectedSectionModalHeading: similarSec
        })
    }
    closeThreeSimilarSectionsModal() {
        this.setState({
            threeSimilarSectionsConfig: {
                ...this.state.threeSimilarSectionsConfig,
                id: "",
                key: "",
                type: "",
                description: "",
            },
            showThreeSimilarSectionsModal: false,
            threeSimilarSections: data.GET_THREE_SIMILAR_SECTIONS_CARDS_DATA,
        })
    }
    handleThreeSimilarSectionsConfigField(e) {
        let name = e.target.name;
        let val = e.target.value;
        this.setState({
            threeSimilarSectionsConfig: {
                ...this.state.threeSimilarSectionsConfig,
                [name]: val
            }
        })
    }
    submitSimilarSectionsCardsInfo() {
        let threeSimilarSectionsConfig = this.state.threeSimilarSectionsConfig;
        let threeSimilarSections = this.state.threeSimilarSections;
        let selectedSectionModal = this.state.selectedSectionModalHeading;
        let uid = new Date().getTime();

        threeSimilarSectionsConfig.id = uid;
        threeSimilarSectionsConfig.type = selectedSectionModal;
        threeSimilarSections[selectedSectionModal].push(threeSimilarSectionsConfig)

        this.setState({
            threeSimilarSections: threeSimilarSections,
            showThreeSimilarSectionsModal: false,
            threeSimilarSectionsConfig: {
                ...this.state.threeSimilarSectionsConfig,
                id: "",
                key: "",
                type: "",
                description: "",
            },

        })

    }
    render() {
        const { loading, level, concepts, showConceptModal, conceptsConfig, threeSimilarSections, showThreeSimilarSectionsModal, selectedSectionModalHeading, threeSimilarSectionsConfig } = this.state;
        // console.log("threeSimilarSections", threeSimilarSectionsConfig, "similarSections", threeSimilarSections)
        // console.log("concepts", concepts, "threeSimilarSections", threeSimilarSections)
        return (
            <div className="environments-container">
                {loading &&
                    <Row>
                        <Col className="text-center">Loading...</Col>
                    </Row>
                }{(!loading && level === 0) &&
                    <>
                        <div className="concepts-container">
                            <Row className="m-0">
                                <Col className="p-0 text-left"><h5>Concepts</h5></Col>
                                <Col className="p-0 text-right"><i className="fa fa-plus concept-plus-icon" onClick={this.handleConceptModal.bind(this)}></i></Col>
                            </Row>
                            <Row xs="1" md="3" className="m-0">
                                {concepts.map((concept, conceptIdx) =>
                                    <Col key={conceptIdx} className="p-1">
                                        
                                        <Card className="small-card-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
                                            <Card.Body className="small-card-body p-2">
                                                <Row className="m-0">
                                                    <Col xs="2" className="p-0 small-img-col">
                                                        <img src={conceptImg} alt="concept-img" height="50%" width="50%" />
                                                    </Col>
                                                    <Col xs="10" className="p-0">
                                                        <small className="m-0 font-weight-bold text-muted">{concept.type.toUpperCase()}</small>
                                                        <h6>{concept.qst}</h6>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                            <Card.Footer className="small-card-footer px-2 py-0">
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
                        </div>
                        <div className="three-similar-sections-container">
                            {Object.keys(threeSimilarSections).map((similarSec, similarSecIdx) =>
                                <div key={similarSecIdx}>
                                    <Row className="m-0 mt-2">
                                        <Col className="p-0 text-left"><h5>{similarSec}</h5></Col>
                                        <Col className="p-0 text-right"><i className="fa fa-plus concept-plus-icon" onClick={this.handleSimilarSectionsModal.bind(this, similarSec)} ></i></Col>
                                    </Row>
                                    <Row xs="1" md="3" className="m-0">
                                        {threeSimilarSections[similarSec].map((sectionCard, sectionCardIdx) =>
                                            <Col key={sectionCardIdx} className="p-1">
                                                <Card className="small-card-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
                                                    <Card.Body className="small-card-body p-2">
                                                        <Row className="m-0">
                                                            <Col xs="2" className="p-0 small-img-col">
                                                                <img src={forThreeSimilarSectionsCardsImg} alt="three-similar-sections-cards-img" height="65%" width="65%" />
                                                            </Col>
                                                            <Col xs="10" className="p-0">
                                                                <h6 className="m-0 mt-2">{sectionCard.description}</h6>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                    <Card.Footer className="small-card-footer px-2 py-0">
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
                                </div>
                            )}
                        </div>
                    </>
                }
                <Modal show={showConceptModal} onHide={this.closeConceptModal.bind(this)} size="lg">
                    <Modal.Header closeButton className="p-2">
                        <Modal.Title>Create concepts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="create-concept-modal-body p-2">
                        <Row className="m-0">
                            {data.CONCEPT_CONFIG_FIELDS.map((conField, conFieldIdx) =>
                                <Col key={conFieldIdx} className="p-2">
                                    <p className="mb-1 mt-2">{conField.label}</p>
                                    <input type={conField.type} name={conField.key} value={conceptsConfig[conField.key]} onChange={this.handleConceptConfigField.bind(this)} className="concepts-input-fields" disabled={conField.key === "type"} />
                                </Col>
                            )}
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className="create-concept-modal-footer p-2">
                        <Button variant="primary" className="m-0" onClick={this.submitConceptCardInfo.bind(this)} disabled={conceptsConfig.qst.length === 0}>Submit</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showThreeSimilarSectionsModal} onHide={this.closeThreeSimilarSectionsModal.bind(this)} size="lg">
                    <Modal.Header closeButton className="p-2">
                        <Modal.Title>Create {selectedSectionModalHeading}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="create-concept-modal-body p-2">
                        <Row className="m-0">
                            {data.THREE_SIMILAR_SECTIONS_CONFIG_FIELDS.map((simConField, simConFieldIdx) =>
                                <Col key={simConFieldIdx} className="p-0">
                                    <p className="mb-1 mt-2">{simConField.label}</p>
                                    <input type={simConField.type} name={simConField.key} value={threeSimilarSectionsConfig[simConField.key]} onChange={this.handleThreeSimilarSectionsConfigField.bind(this)} className="similar-Sections-input-fields" />
                                </Col>
                            )}
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className="create-concept-modal-footer p-2">
                        <Button variant="primary" className="m-0" onClick={this.submitSimilarSectionsCardsInfo.bind(this, )}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}