import React from 'react';
import { Row, Col, Button } from "react-bootstrap";
import data from './SolutionsData';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            solutionConfig: this.props.cardObj.cardConfig,
        }
    }

    handleFields(e) {
        let name = e.target.name
        let val = e.target.value;
        this.setState({
            solutionConfig: {
                ...this.state.solutionConfig,
                [name]: val
            }
        })
    }
    handleSubmit() {
        // e.preventDefault();
        this.props.onSave(this.state.solutionConfig)
    }
    render() {
        let { solutionConfig } = this.state;
        return (
            <div className="p-3 m-2 configure-content">
                <Row xs="1" md="2" className="m-0">
                    {data.PROPERTY_FIELDS.map((field, fieldIdx) =>
                        <div key={fieldIdx}>
                            {field.type !== "textarea" &&
                                <Col className="p-2">
                                    <p className="m-0">{field.label}</p>
                                    <input type={field.type} name={field.key} value={solutionConfig[field.key]} onChange={this.handleFields.bind(this)} className={`${field.type === "text" && "text-field"}`} />
                                </Col>
                            }{field.type === "textarea" &&
                                <Col className="p-2">
                                    <p className="m-0">{field.label}</p>
                                    <textarea name={field.key} rows={field.rows} value={solutionConfig[field.key]} onChange={this.handleFields.bind(this)} className={`${field.type === "textarea" && "text-area-field"}`} />
                                </Col>
                            }
                        </div>
                    )}
                </Row>
                <div className="button-container p-1">
                    <Row className="m-0">
                        <Col className="p-0 text-right">
                            <Button variant="primary" onClick={this.handleSubmit.bind(this)}
                                className={((solutionConfig.title.length > 0) && (solutionConfig.name.length > 0) && (solutionConfig.description.length > 0)) ? "valid-button" : "invalid-button" }
                            >
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}