import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import Header from './components/header/Header';
import SideNav from './components/sidenav/SideNav';
// import Home from './components/home/Home';
// import Dashboard from './components/dashboard/Dashboard';
// import UserTasks from './components/usertasks/UserTasks';
// import Solutions from './components/solutions/Solutions';
// import Environments from './components/environments/Environments';
// import CustomDefaultPage from './components/customDefaultComponent/CustomDefaultPage';
import routeJson from './components/routeData/RouteJson';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverOnSideNav: false
    }
  }

  mouseEnter() {
    this.setState({ hoverOnSideNav: true })
  }
  mouseLeave() {
    this.setState({ hoverOnSideNav: false })
  }

  render() {
    const menu = routeJson.map((route, routeIdx) => {
      return (route.component) && (
        <Route 
          key={routeIdx}
          path={route.to}
          exact={route.exact}
          name={route.label}
          render={ props => <route.component {...props} />}
        />
      )
    })

    const subMenu = routeJson.map(route => 
      (route.subMenu && route.children) && 
      route.children.map((subRoute, subRouteIdx) => {
        return(subRoute.component)&& (
          <Route
            key={subRouteIdx}
            path={subRoute.to}
            exact={subRoute.exact}
            name={subRoute.label}
            render={ props => <subRoute.component {...props} />}
          />
        )
      })
    )
    
    return (
      <div className="App">
        <Row>
          <Col>
            <Router>
              <div className="body-content">
                <div className="header-component">
                  <Header />
                </div>
                <div className="side-nav-content shadow" onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
                  <SideNav hoverOnSideNav={this.state.hoverOnSideNav} />
                </div>
                <div className="components-content py-2">
                  {/* <Route path="/Home" component={Home} />
                  <Route path="/Dashboard" component={Dashboard} />
                  <Route path="/Usertasks" component={UserTasks} />
                  <Route path="/Solutions" component={Solutions} />
                  <Route path="/Environments" component={Environments} /> */}
                  {menu}
                  {subMenu}
                </div>
              </div>
            </Router>
          </Col>
        </Row>
      </div>
    );
  }
}