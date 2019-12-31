import React, {Component} from 'react';
import { getFromStorage, setInStorage } from '../../utility/storage.js';

export default class RegisterMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            inputFullname: '',
            inputGrade: '',
            inputEmail: '',
            inputUsername: '',
            inputPassword: '',
            inputRePassword: '',
            running: false
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.handleChangeinputFullname = this.handleChangeinputFullname.bind(this)
        this.handleChangeinputGrade = this.handleChangeinputGrade.bind(this)
        this.handleChangeinputEmail = this.handleChangeinputEmail.bind(this)
        this.handleChangeinputUsername = this.handleChangeinputUsername.bind(this)
        this.handleChangeinputPassword = this.handleChangeinputPassword.bind(this)
        this.handleChangeinputRePassword = this.handleChangeinputRePassword.bind(this)
    }
    handleChangeinputFullname(event) {this.setState({inputFullname: event.target.value})}
    handleChangeinputGrade(event) {this.setState({inputGrade: event.target.value})}
    handleChangeinputEmail(event) {this.setState({inputEmail: event.target.value})}
    handleChangeinputUsername(event) {this.setState({inputUsername: event.target.value})}
    handleChangeinputPassword(event) {this.setState({inputPassword: event.target.value})}
    handleChangeinputRePassword(event) {this.setState({inputRePassword: event.target.value})}


    handleRegister(event) {
        event.preventDefault()
        this.setState({
            running: true
        })
        let item = {
            fullname: this.state.inputFullname,
            grade: this.state.inputGrade,
            email: this.state.inputEmail,
            username: this.state.inputUsername,
            password: this.state.inputPassword,
            repassword: this.state.inputRePassword
        }

        fetch(`http://localhost:9000/nguoidung/dangky`, {
            method: `POST`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer 669`
            },
            body: JSON.stringify(item)
          })
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
            if (json.success) {
                this.setState({
                    error: false,
                    running: false
                })
                alert("Tạo tài khoản thành công.")
                window.location.replace('//localhost:3000/dangnhap');
            }
            else {
                this.setState({
                    error: true,
                    errorMessage: json.message,
                    errorCode: json.code,
                    running: false
                })
            }
        })
    }
    render() {
        const {
            error,
            errorCode,
            running
        } = this.state
        return (
            <div class="row">
                <div class="col-md-6 ml-auto mr-auto">
                        <h2 class="card-title text-center register-icon">Đăng Ký</h2>
                        <div class="card-card card-signup">
                        <form class="form" method="" action="">
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon register-icon">
                                        <i class="material-icons">face</i>
                                    </span>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        placeholder="Họ Tên..."
                                        value={this.state.inputFullname}
                                        onChange={this.handleChangeinputFullname}
                                    />
                                    <div 
                                        className="col-md-1 error" 
                                        hidden={!error || !(errorCode === 1)}>
                                        <span class="input-group-addon error">
                                            <i class="material-icons">error</i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon register-icon">
                                        <i class="material-icons">school</i>
                                    </span>
                                    <input 
                                        type="number" 
                                        min="1" 
                                        max="5" 
                                        class="form-control" 
                                        placeholder="Lớp..."
                                        value={this.state.inputGrade}
                                        onChange={this.handleChangeinputGrade}
                                    />
                                    <div 
                                        className="col-md-1 error" 
                                        hidden={!error || !(errorCode === 2 || errorCode === 3 || errorCode === 4)}>
                                        <span class="input-group-addon error">
                                            <i class="material-icons">error</i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon register-icon">
                                        <i class="material-icons">account_box</i>
                                    </span>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        placeholder="Tên Đăng Nhập..."
                                        value={this.state.inputUsername}
                                        onChange={this.handleChangeinputUsername}
                                    />
                                    <div 
                                        className="col-md-1 error" 
                                        hidden={!error || !(errorCode === 6 || errorCode === 11)}>
                                        <span class="input-group-addon error">
                                            <i class="material-icons">error</i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon register-icon">
                                        <i class="material-icons">email</i>
                                    </span>
                                    <input 
                                        type="email" 
                                        class="form-control" 
                                        placeholder="Email..."
                                        value={this.state.inputEmail}
                                        onChange={this.handleChangeinputEmail}
                                    />
                                    <div 
                                        className="col-md-1 error" 
                                        hidden={!error || !(errorCode === 5 || errorCode === 12)}>
                                        <span class="input-group-addon error">
                                            <i class="material-icons">error</i>
                                        </span>
                                    </div>
                                </div>                                
                            </div>
                            
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon register-icon">
                                        <i class="material-icons">lock_outline</i>
                                    </span>
                                    <input 
                                        type="password" 
                                        placeholder="Mật Khẩu..." 
                                        value={this.state.inputPassword}
                                        onChange={this.handleChangeinputPassword}
                                        class="form-control" 
                                    />
                                    <div 
                                        className="col-md-1 error" 
                                        hidden={!error || !(errorCode === 7 || errorCode === 8 || errorCode === 10)}>
                                        <span class="input-group-addon error">
                                            <i class="material-icons">error</i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon register-icon">
                                        <i class="material-icons">autorenew</i>
                                    </span>
                                    <input 
                                        type="password" 
                                        placeholder="Nhập Lại Mật Khẩu..." 
                                        value={this.state.inputRePassword}
                                        onChange={this.handleChangeinputRePassword}
                                        class="form-control" 
                                    />
                                     <div 
                                        className="col-md-1 error" 
                                        hidden={!error || !(errorCode === 9 || errorCode === 10)}>
                                        <span class="input-group-addon error">
                                            <i class="material-icons">error</i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <label 
                                for="inputState" 
                                id="warning" 
                                hidden={!this.state.error}>
                                {this.state.errorMessage}
                            </label>
                            <br/>
                            <div class="text-center" >
                                <button className="btn btn-primary btn-round" onClick={this.handleRegister}  disabled={running}>
                                    Xác Nhận
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
        
        )
    }
}