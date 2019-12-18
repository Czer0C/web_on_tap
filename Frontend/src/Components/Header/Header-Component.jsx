import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import { getFromStorage, removeFromStorage } from '../../utility/storage.js';

export default class Header extends Component    {
    constructor(props) {
        super(props);
        this.state = {
            menu_1: 1,
            userID: this.props.userID,
            userGrade: this.props.userGrade,
            userName: this.props.username
        }
        this.handleLogout = this.handleLogout.bind(this)
    }
    componentDidMount() {
        // console.log("Grade: " + this.state.userGrade)
    }
    
    handleLogout() {
        const signout = getFromStorage('signin');
        if (signout && signout.token_key) {
            fetch(`http://localhost:9000/users/dangxuat`, {
                method: `post`,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(signout)
            })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    removeFromStorage('signin');
                    window.location.replace('//localhost:3000');
                    //window.location.replace("https://chidori-auction.herokuapp.com/");    
                }
                else {
                    alert("Thất bại, hãy thử lại sau.")
                }
            })       
        }
    }


    render() {
        var s1 = {
            "background-image": "url(https://i.imgur.com/AprDMiS.png)",
            "height": "500px"
        };

        var navStyle = {
            color: "white"
        }
        return (
            <div>
                <nav class="navbar navbar-color-on-scroll fixed-top navbar-expand-lg bg-primary" color-on-scroll="100" id="sectionsNav">
                    <div class="container">
                        <div class="navbar-translate">
                        <NavLink to="/" class="navbar-brand">TÊN WEB&nbsp;<div class="ripple-container"></div></NavLink>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                            <span class="navbar-toggler-icon"></span>
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                        <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <NavLink class="nav-link" to="/luyen" style={navStyle}><i class="material-icons">&nbsp;create</i>Luyện tập&nbsp;</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink class="nav-link" to="/sosanh" style={navStyle}><i class="material-icons">&nbsp;bar_chart</i>So sánh&nbsp;</NavLink>
                            </li>
                            <li class="dropdown nav-item">
                                <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                                    <i class="material-icons">&nbsp;view_day</i>Bảng xếp hạng&nbsp;
                                </a>
                                <div class="dropdown-menu dropdown-with-icons">
                                    <a href="./sections.html#headers" class="dropdown-item">
                                        <i class="material-icons">&nbsp;dns</i>Theo năm&nbsp;
                                    </a>
                                    <a href="./sections.html#features" class="dropdown-item">
                                        <i class="material-icons">&nbsp;build</i>Theo tháng&nbsp;
                                    </a>
                                    <a href="./sections.html#blogs" class="dropdown-item">
                                        <i class="material-icons">&nbsp;list</i>Theo ngày&nbsp;
                                    </a>
                                </div>
                            </li>

                            <li class="dropdown nav-item">
                                <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                                    <i class="material-icons">&nbsp;person</i>{this.state.userName.split(" ")[0]} - Lớp {this.state.userGrade}
                                    <div class="ripple-container"></div>
                                </a>
                                <div class="dropdown-menu dropdown-with-icons">
                                    <a href="#" class="dropdown-item" onClick={this.handleLogout}>
                                        <i class="material-icons">&nbsp;backspace</i>Đăng Xuất&nbsp;
                                    </a>
                                </div>
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
