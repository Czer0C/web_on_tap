import React, {Component} from 'react';
import '../Register/Register.css';
import { getFromStorage, setInStorage } from '../../utility/storage.js';
import RegisterMain from './Register-Main';


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUsername: '',
            inputPassword: '',  
            error: false
        }
        //this.handleLogin = this.handleLogin.bind(this)
        
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
                window.location.replace('//localhost:3000');
            }
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
                    token_key: json.token
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
                    <div className="main main-raised main-product">
                        <div className="row">
                            <div className="col">
                                <center>
                                {
                                    this.state.token_key ? 
                                    <h2>Bạn đã có tài khoản</h2> :
                                    <RegisterMain/>
                                
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