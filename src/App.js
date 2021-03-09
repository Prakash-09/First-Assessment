import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import Header from './components/header/Header';
import Site from './components/site/Site';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverOnSideNav: false
    }
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col>
            <Router>
              <div className="body-content">
                <div className="header-component">
                  <Header />
                </div>
                <div className="header-component">
                  <Site />
                </div>
              </div>
            </Router>
          </Col>
        </Row>
      </div>
    );
  }
}