import React, {Component} from 'react';
import App from '../../App';
import '../Login/Login.css';
import { getFromStorage, setInStorage } from '../../utility/storage.js';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userID: '',
            userGrade: '',
            userType: '',
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
                username: signin.username,
                userID: signin.userID,
                userGrade: signin.userGrade,
                userType: signin.userType
            })
        }
    }

    handleLogin() {
        let item = {
            username: this.state.inputUsername,
            password: this.state.inputPassword
        }
        fetch(`http://localhost:9000/nguoidung/dangnhap`, {
            method: `POST`,
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
                    userGrade: json.userGrade,
                    userType: json.userType
                });

                this.setState({
                    username: this.state.inputUsername,
                    userID: json.userID,
                    userGrade: json.userGrade,
                    userType: json.userType,
                    on: true
                })

                window.location.replace('//localhost:3000');
            }
            else {
                this.setState({
                    error: true
                })
            }
        })
    }

    render() {

        return (
            <div className="product-page">
                <div className="section section-gray">
                    <div className="container">
                    <div class="main main-raised main-product">
                        <div className="row">
                            <div className="col">
                                <center>
                                {
                                    this.state.username !== '' ? <p>Bạn đã đăng nhập</p> :
                                    <div class="col-md-4 col-sm-6 ml-auto mr-auto">
                    <div class="card card-signup">
                        <form class="form">
                            <div class="card-header card-header-info text-center">
                                <h4 class="card-title">Đăng Nhập</h4>
                            </div>
                            <div class="card-body">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons" id="login-icon-username">face</i>
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
                                        <i class="material-icons" id="login-icon-password">lock_outline</i>
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
                                
                                }
                                </center>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        
        )
    }
}