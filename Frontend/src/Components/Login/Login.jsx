import React, {Component} from 'react';
import App from '../../App';
import '../Login/Login.css';
import { getFromStorage, setInStorage } from '../../utility/storage.js';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            on: false,
            username: '',
            userID: '',
            userGrade: '',
            inputUsername: '',
            inputPassword: '',
            error: false
        }
        this.handleLogin = this.handleLogin.bind(this)
        
        this.handleChangeInputUsername = this.handleChangeInputUsername.bind(this);
        this.handleChangeInputPassword = this.handleChangeInputPassword.bind(this);
    }
    handleChangeInputUsername(event){this.setState({inputUsername:event.target.value, error: false})}
    handleChangeInputPassword(event){this.setState({inputPassword:event.target.value, error: false})}

    componentDidMount() {
        this.verify()
    }

    verify() {
        const signin = getFromStorage('signin')
        if (signin) {
            this.setState({
                on: true,
                username: signin.username,
                userID: signin.userID,
                userGrade: signin.userGrade
            })
        }
    }

    handleLogin() {
        let item = {
            username: this.state.inputUsername,
            password: this.state.inputPassword
        }
        fetch(`http://localhost:9000/users/dangnhap`, {
            method: `post`,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
          })
        .then((res) => res.json())
        .then((json) => {
            if (json.success) {
                setInStorage('signin', {
                    access_token: json.token, 
                    token_key: json.token,
                    username: this.state.inputUsername,
                    userID: json.userID,
                    userGrade: json.userGrade
                });

                this.setState({
                    username: this.state.inputUsername,
                    userID: json.userID,
                    userGrade: json.userGrade,
                    on: true
                })
            }
            else {
                this.setState({
                    error: true
                })
            }
        })
    }

    render() {
        const {
            on
        } = this.state

        if (!on) {
            return (
                <div class="login-page">
        
            <nav class="navbar navbar-color-on-scroll navbar-transparent fixed-top  navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
            <div class="container">
                <div class="navbar-translate">
                    <p class="navbar-brand">Tên Web</p>
                </div>
            </div>
        </nav>
        <div class="page-header header-filter">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-sm-6 ml-auto mr-auto">
                        <div class="card card-signup">
                            <form class="form">
                                <div class="card-header card-header-info text-center">
                                    <h4 class="card-title">Đăng Nhập</h4>
                                </div>
                                <div class="card-body">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">face</i>
                                        </span>
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Tên đăng nhập..."
                                            onChange={this.handleChangeInputUsername}
                                            value={this.state.inputUsername}
                                        />
                                    </div>
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">lock_outline</i>
                                        </span>
                                        <input 
                                            type="password" 
                                            class="form-control" 
                                            placeholder="Mật khẩu..."
                                            onChange={this.handleChangeInputPassword}
                                            value={this.state.inputPassword}
                                        />
                                    </div>
                                </div>
                                
                            </form>
                            <div class="footer text-center">
                                <label for="inputState" id="warning" hidden={!this.state.error}>Tên đăng nhập và mật khẩu không hợp lệ.</label>
                                <br/>
                                <button 
                                    class="btn btn-info btn-link btn-wd btn-lg" 
                                    onClick={this.handleLogin}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            )
        }
        else return (
            <App username={this.state.username} userID={this.state.userID} userGrade={this.state.userGrade}></App>
        )
    }
}
