import React, {Component} from 'react';
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
            if (signin.token_key) {
                this.setState({
                    username: signin.username,
                    userID: signin.userID,
                    userGrade: signin.userGrade,
                    userType: signin.userType,
                    token_key: signin.token_key
                })
                window.location.replace('https://web-on-tap.firebaseapp.com');
            }
        }
    }

    handleLogin() {
        let item = {
            username: this.state.inputUsername,
            password: this.state.inputPassword
        }
        fetch(`https://web-tv-5.herokuapp.com/nguoidung/dangnhap`, {
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
                    token_key: json.token
                })

                window.location.replace('https://web-on-tap.firebaseapp.com');
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
                    <div className="main main-raised main-product">
                        <div className="row">
                            <div className="col">
                                <center>
                                {
                                    this.state.token_key ? 
                                    <h2>Bạn đã đăng nhập</h2> :
                                    <div className="col-md-4 col-sm-6 ml-auto mr-auto">
                    <div className="card card-signup">
                        <form className="form">
                            <div className="card-header card-header-info text-center" id="header-login">
                                <h4 className="card-title">Đăng Nhập</h4>
                            </div>
                            <div className="card-body">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="material-icons" id="login-icon-username">face</i>
                                    </span>
                                    <input 
                                        type="text" 
                                        className="form-control login-input" 
                                        placeholder="Tên đăng nhập..."
                                        onChange={this.handleChangeInputUsername}
                                        value={this.state.inputUsername}
                                    />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="material-icons" id="login-icon-password">lock_outline</i>
                                    </span>
                                    <input 
                                        type="password" 
                                        className="form-control login-input" 
                                        placeholder="Mật khẩu..."
                                        onChange={this.handleChangeInputPassword}
                                        value={this.state.inputPassword}
                                    />
                                </div>
                            </div>
                            
                        </form>
                        <div className="footer text-center">
                            <label 
                                for="inputState" 
                                id="warning" 
                                hidden={!this.state.error}>
                                Tên đăng nhập và mật khẩu không hợp lệ.
                            </label>
                            <br/>
                            <button 
                                className="btn btn-info btn-link btn-wd btn-lg" 
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