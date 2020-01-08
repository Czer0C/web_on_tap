import React, { Component } from 'react';
import ExamTab from './Manager-Components/Exam-Tab';
import UserTab from './Manager-Components/User-Tab';
import './Manager.css';




export default class ManagerMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: []
        }
    }

    render() {
        const {
            info
        } = this.state
        return (
            <div className="product-page">
    
                    <div className="section section-gray">
                        <div className="container">
                            <div className="main main-raised nav-justified">
                            {
                            !this.state.info ? 
                            <img id="loading" src="https://i.imgur.com/FMpRIoS.gif"></img> :
                            <div class="card card-nav-tabs card-plain">
                                <div class="card-header card-header-success">                           
                                    <div class="nav-tabs-navigation">
                                        <div class="nav-tabs-wrapper">
                                            <ul class="nav nav-tabs" data-tabs="tabs">
                                                <li class="nav-item">
                                                    <a class="nav-link active" href="#general" data-toggle="tab"><i class="material-icons">assignment</i>Bài kiểm tra</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" href="#password" data-toggle="tab"><i class="material-icons">people</i>Người dùng</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {
                                !this.state.info ? 
                                null :
                                <div class="card-body ">
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="general">
                                            <ExamTab/>
                                        </div>
                                        <div class="tab-pane" id="password">
                                            <UserTab/>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                    }
                         </div>
                        </div>
                        </div>
                        </div>
        )
    }
}