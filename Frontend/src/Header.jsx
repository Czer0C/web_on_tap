import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

export default class Header extends Component    {
    constructor(props) {
        super(props);
        this.state = {
            menu_1: 1
        }
    }
    dropdown = () => {
        this.setState({menu_1 : !this.state.menu_1})
    }
    
    render() {
        var s1 = {
            "background-image": "url(https://i.imgur.com/AprDMiS.png)",
            "height": "500px"
        };
        return (
            <div>
                <nav class="navbar navbar-color-on-scroll fixed-top navbar-expand-lg bg-primary" color-on-scroll="100" id="sectionsNav">
                    <div class="container">
                        <div class="navbar-translate">
                        <NavLink to="/" class="navbar-brand">TÊN WEB <div class="ripple-container"></div></NavLink>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                            <span class="navbar-toggler-icon"></span>
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                        <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <NavLink class="nav-link" to="/luyen">Luyện tập </NavLink>
                            </li>
                            <li class="dropdown nav-item">
                                <a href={null} class="dropdown-toggle nav-link" data-toggle="dropdown" onClick={this.dropdown}>
                                    <i class="material-icons">view_day</i> Bảng xếp hạng
                                </a>
                                <div class={this.state.menu_1 ? "dropdown-menu dropdown-with-icons" : "dropdown-menu dropdown-with-icons show"}>
                                    <a href="./sections.html#headers" class="dropdown-item">
                                        <i class="material-icons">dns</i> Theo năm
                                    </a>
                                    <a href="./sections.html#features" class="dropdown-item">
                                        <i class="material-icons">build</i> Theo tháng
                                    </a>
                                    <a href="./sections.html#blogs" class="dropdown-item">
                                        <i class="material-icons">list</i> Theo ngày
                                    </a>
                                </div>
                            </li>
                            <li class="button-container nav-item">
                                <a href="#" target="_blank" class="btn  btn-primary   btn-round btn-block">
                                    <i class="material-icons">person</i> Tài khoản
                                <div class="ripple-container"></div></a>
                            </li>
                        </ul>
                    </div>
                    </div>
                </nav>
                <div class="page-header header-filter clear-filter" data-parallax="true" style={s1}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8 ml-auto mr-auto">
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    
        )
    }
};
