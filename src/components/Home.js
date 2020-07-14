import React, { Component } from 'react';
import './css/Home.css';

class Home extends Component {
    render() {
        return (
            <div className="row home-main-row">
                <div className="col-md-5 col-sm-5 cards text-center shadow">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 digital-solution-studio-title">
                            <h5>Digital Solution Studio</h5>
                            <p className="discription">Digital Platform for an intuitive Enterprise</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 digital-Solution-studio-image">
                            <img src="/images/modern-isometric.jpg" height="225px" width="300px" alt="Digital Solution" /><br /><br />
                            <button type="button" className="btn btn-primary digital-button">Get Started</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 container" >
                    <div className="row ">
                        <div className="col-md col-sm cards shadow">
                            <div className="row">
                                <div className="col-md-12">
                                    <h6 className="small-card-title">Digital Solution</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 discription">
                                    <p>Accesslerated Assembly, Any-to-Any Integrations</p>
                                </div>
                                <div className="col-md-6 small-card-images text-right">
                                    <img src="/images/digital-solutions.svg" height="50px" width="50px" alt="Digital Solution" />
                                </div>
                            </div>
                            <div className="row container">
                                <div className="col-md-12 knowMore">
                                    <a href="#" className="digital-solution-know-more">Know More {'>>'}</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md col-sm cards shadow">
                            <div className="row">
                                <div className="col-md-12">
                                    <h6 className="small-card-title">Model Management</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 discription">
                                    <p>Model Catalogue &Deployment,Monitoring & Govarnance</p>
                                </div>
                                <div className="col-md-6 col-sm-6 small-card-images text-right">
                                    <img src="/images/model-management.png" height="50px" width="50px" alt="model-management-image" />
                                </div>
                            </div>
                            <div className="row container">
                                <div className="col-md-12 knowMore">
                                    <a href="#" className="model-management-know-more">Know More {'>>'}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md col-sm cards shadow">
                            <div className="row">
                                <div className="col-md-12">
                                    <h6 className="small-card-title">Cognitive Fusion</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 discription">
                                    <p>Scalable Data Pipeline, Artificial intilligence</p>
                                </div>
                                <div className="col-md-6 small-card-images text-right">
                                    <img src="/images/cognitive-fusion.svg" height="50px" width="50px" alt="cognitive-fusion-image" />
                                </div>
                            </div>
                            <div className="row container">
                                <div className="col-md-12 knowMore">
                                    <a href="#" className="cognitive-fusion-know-more">Know More {'>>'}</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md col-sm cards shadow">
                            <div className="row">
                                <div className="col-md-12"> 
                                    <h6 className="small-card-title">Sensor Fabric</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 discription">
                                    <p>Edge Orchestration and automation</p>
                                </div>
                                <div className="col-md-6 small-card-images text-right">
                                    <img src="/images/sensor-fabric.svg" height="50px" width="50px" alt="sensor-fabric-image" />
                                </div>
                            </div>
                            <div className="row container">
                                <div className="col-md-12 knowMore">
                                    <a href="#" className="sensor-fabric-know-more">Know More {'>>'}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md col-sm">
                            <div className="row">
                                <div className="col-md col-sm cards shadow">
                                    <div className="last-image">
                                        <img src="/images/design.svg" height="25px" width="25px" alt="design-image" />
                                    </div>
                                    <small className="last-title">Design</small>
                                    <p className="last-discriptions">Get started width our visual IDE for designing the
                                        Applications, Workflows,Models and Rules. A Visual IDE for Any-to-Any
                                        Enterprise Intigration Solutions. Design and Build APIs, and Integrate at a
                                        lighting speed.
                                    </p>
                                </div>
                                <div className="col-md col-sm cards shadow">
                                    <div className="last-image">
                                        <img src="/images/deploy.svg" height="25px" width="25px" alt="deploy-image" />
                                    </div>
                                    <small className="last-title">Deploy</small>
                                    <p className="last-discriptions">Deploy your Apps with one click to the Environment
                                        of your choice with Cloud support for AWS,Azure, Google Cloud and OpenStack, Leverage the
                                        build CI/CD Pipeline via the PlatformAPIs to rapidly build, test, migrate, export, export and
                                        Deploy the Solutions across Environments.
                                    </p>
                                </div>
                                <div className="col-md col-sm cards shadow">
                                    <div className="last-image">
                                        <img src="/images/run.svg" height="25px" width="25px" alt="run-image" />
                                    </div>
                                    <small className="last-title">Run</small>
                                    <p className="last-discriptions">Run and Monitor APIs of your Solutions from your Enterprise
                                        Dashboard. Configure and Scale your Environments, Monitor Real-Time Health and Stability of your
                                        Solution Landscape.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;