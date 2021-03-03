import React, { Component } from 'react';
import './Dashboard.css';
import { Row, Col } from 'react-bootstrap';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Row className="m-0">
                    <Col className="p-0">
                        Hello dashboard
                    </Col>
                </Row>
            </div>
        );
    }
}