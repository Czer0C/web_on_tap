import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import { getFromStorage, removeFromStorage } from '../../utility/storage.js';
export default class Header extends Component    {
    constructor(props) {
        super(props);
        this.state = {
            menu_1: 1,
            userID: this.props.userID || -1,
            userGrade: this.props.userGrade || -1,
            userType: this.props.userType || -1,
            userName: this.props.username || "Guest"
        }
        this.handleLogout = this.handleLogout.bind(this)
    }
    componentDidMount() {
        
    }
    
    handleLogout() {
        const signout = getFromStorage('signin');
        if (signout && signout.token_key) {
            fetch(`https://web-tv-5.herokuapp.com/nguoidung/dangxuat`, {
                method: `DELETE`,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer 669`
                },
                body: JSON.stringify(signout)
            })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    removeFromStorage('signin');
                    window.location.replace('https://web-on-tap.firebaseapp.com');
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
        const {
            userName,
            userGrade,
            userType
        } = this.state

        return (
            <div>
                <nav class="navbar navbar-color-on-scroll fixed-top navbar-expand-lg bg-primary" color-on-scroll="100" id="sectionsNav">
                    <div class="container">
                        <div class="navbar-translate">
                            <NavLink to="/" class="navbar-brand"><img src="https://i.imgur.com/e8EjWdt.png?1" width="80px" align="top"></img></NavLink>
                        </div>
                        <div class="collapse navbar-collapse">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item">
                                    <NavLink className="nav-link" activeClassName="nav-link active" to="/" style={navStyle}>
                                        <i class="material-icons">&nbsp;home</i>Trang chủ&nbsp;
                                    </NavLink>
                                </li>
                                <li class="nav-item">
                                    <NavLink className="nav-link" activeClassName="nav-link active" to="/sosanh" style={navStyle}>
                                        <i class="material-icons">&nbsp;bar_chart</i>So sánh&nbsp;
                                    </NavLink>
                                </li>
                                <li class="nav-item" hidden={userGrade !== -1}>
                                    <NavLink className="nav-link" activeClassName="nav-link active" to="/dangnhap" style={navStyle}>
                                        <i class="material-icons">&nbsp;account_box</i>Đăng nhập&nbsp;
                                    </NavLink>
                                </li>
                                <li class="nav-item" hidden={userGrade !== -1}>
                                    <NavLink className="nav-link" activeClassName="nav-link active" to="/dangky" style={navStyle}>
                                        <i class="material-icons">&nbsp;note_add</i>Đăng ký&nbsp;
                                    </NavLink>
                                </li>  
                                <li class="nav-item" hidden={userType < 2}>
                                    <NavLink className="nav-link" activeClassName="nav-link active" to="/admin" style={navStyle}>
                                        <i class="material-icons">&nbsp;dashboard</i>Quản lý&nbsp;
                                    </NavLink>
                                </li>   
                                <li class="dropdown nav-item" hidden={userGrade === -1}>
                                    <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                                        <i class="material-icons">&nbsp;person</i>{userName} - Lớp {userGrade}
                                    </a>
                                    <div class="dropdown-menu dropdown-with-icons">
                                        <NavLink to="/canhan" className="dropdown-item" activeClassName="dropdown-item active">
                                            <i class="material-icons">&nbsp;person</i>Trang Cá Nhân&nbsp;
                                        </NavLink>
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
