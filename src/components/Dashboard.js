import React, { Component } from 'react';
import './css/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            showShowPalatte: false,
            showShowProperties: false
        }
    }
    handleShowPallate = (e) => {
        e.preventDefault();
        document.getElementById("leftSidePannel").classList.toggle("active");
        document.getElementById("leftPannelButton").classList.toggle("active");
        this.setState({
            showShowPalatte: !this.state.showShowPalatte
        })
    }
    handleShowProperties = (e) =>{
        e.preventDefault();
        document.getElementById("rightSidePannel").classList.toggle("active");
        document.getElementById("rightPanelButton").classList.toggle("active");
        this.setState({
            showShowProperties: !this.state.showShowProperties
        })
    }
    render() {
        return (
            <div className="main-card shadow">
                <div className="dashBoard">
                    <div>
                        {this.state.showShowPalatte ?
                            <button id="leftPannelButton" 
                                onClick={this.handleShowPallate} 
                                value="Show Palatte" >
                                    Hide Palatte
                                <FontAwesomeIcon icon={faChevronUp} className="showPalatteLeftIcon" />
                            </button>
                            : <button id="leftPannelButton" 
                                onClick={this.handleShowPallate} 
                                value="Show Palatte" >
                                    Show Palatte
                                <FontAwesomeIcon icon={faChevronDown} className="showPalatteRightIcon" />
                            </button>
                        }
                        <ul id="leftSidePannel">
                            <li className="leftSide-lists">Comparison</li>
                            <li className="leftSide-lists">Distribution</li>
                            <li className="leftSide-lists">Proportion</li>
                            <li className="leftSide-lists">Dimension</li>
                            <li className="leftSide-lists">Difference</li>
                            <li className="leftSide-lists">Data Table</li>
                        </ul>
                    </div>
                    <div>
                        {this.state.showShowProperties ?
                            <button id="rightPanelButton" 
                                onClick={this.handleShowProperties} 
                                value="Show Properties" >
                                    Hide Properties
                                    <FontAwesomeIcon icon={faChevronDown} className="showPropertiesRightIcon" />
                            </button>
                            : <button id="rightPanelButton" 
                            onClick={this.handleShowProperties} 
                            value="Show Properties" >
                                Show Properties
                                <FontAwesomeIcon icon={faChevronUp} className="showPropertiesLeftIcon" />
                            </button>
                        }
                        <div id="rightSidePannel">
                            <h6 className="rightSide-lists">Properties</h6>
                            <h6 className="rightSide-lists">Data</h6><hr />
                        </div>
                    </div>
                    <div className="row container">
                        <div className="col-md-12 col-sm-12 dashboard-content">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 
                                1500s, when an unknown printer took a galley of type and scrambled it to 
                                make a type specimen book. It has survived not only five centuries, but 
                                also the leap into electronic typesetting, remaining essentially unchanged. 
                                It was popularised in the 1960s with the release of Letraset sheets containing 
                                Lorem Ipsum passages, and more recently with desktop publishing software like 
                                Aldus PageMaker including versions of Lorem Ipsum.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 
                                1500s, when an unknown printer took a galley of type and scrambled it to 
                                make a type specimen book. It has survived not only five centuries, but 
                                also the leap into electronic typesetting, remaining essentially unchanged. 
                                It was popularised in the 1960s with the release of Letraset sheets containing 
                                Lorem Ipsum passages, and more recently with desktop publishing software like 
                                Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Dashboard;