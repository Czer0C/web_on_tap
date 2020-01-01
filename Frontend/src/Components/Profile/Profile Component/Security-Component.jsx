import React, {Component} from 'react';
import './Info.css';

export default class SecurityComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        } = this.props
        this.onChangeinputOldPassword = this.onChangeinputOldPassword.bind(this)
        this.onChangeinputNewPassword = this.onChangeinputNewPassword.bind(this)
        this.onChangeinputReNewPassword = this.onChangeinputReNewPassword.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
    }

    onChangeinputOldPassword(event) {this.setState({inputOldPassword:event.target.value})}
    onChangeinputNewPassword(event) {this.setState({inputNewPassword:event.target.value})}
    onChangeinputReNewPassword(event) {this.setState({inputReNewPassword:event.target.value})}
    componentDidMount() {
        this.setState({
            inputOldPassword: '',
            inputNewPassword: '',
            inputReNewPassword: '',
            error: false,
            errorMessage: '',
            errorCode: NaN,
            running: false
        })
    }

    handleConfirm(event) {
        event.preventDefault()
        this.setState({
            running: true
        })
        fetch(`http://localhost:9000/nguoidung/capnhatmatkhau`, {
                method: `PATCH`,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer 669`
                },
                body: JSON.stringify({
                    id: this.props.info.MaNguoiDung,
                    info: {
                        oldPassword: this.state.inputOldPassword,
                        newPassword: this.state.inputNewPassword,
                        reNewPassword: this.state.inputReNewPassword
                    }
                })
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    running: false
                })
                if (json.success) {
                    this.setState({
                        error: false,
                        errorMessage: ''
                    })
                    alert("Cập nhật thành công.")
                   
                    //window.location.replace('//localhost:3000/canhan');
                   
                }
                else {
                    this.setState({
                        error: true,
                        errorMessage: json.message,
                        errorCode: json.code
                    })
                }
            })  
    }
    render() {
        const {
            info,
            error,
            errorMessage,
            errorCode,
            running
        } = this.state
        return (
            <div>
                {   
                    !info ? 
                    <img id="loading" src="https://i.imgur.com/FMpRIoS.gif"></img>  : 
                    <form>
                        <center>
                        <div class="form-group col-md-5">
                                <label className="profile-info-label" for="inputPassword">Mật Khẩu Cũ</label>
                                <input 
                                    type="password" 
                                    class="form-control profile-input" 
                                    id="inputPassword" 
                                    value={this.state.inputOldPassword} 
                                    placeholder="Mật Khẩu Cũ"
                                    onChange={this.onChangeinputOldPassword}
                                />
                            </div>
                            <div class="form-group col-md-5">
                                <label className="profile-info-label" for="inputNewPassword">Mật Khẩu Mới</label>
                                <input 
                                    type="password" 
                                    class="form-control profile-input"
                                    id="inputNewPassword" 
                                    value={this.state.inputNewPassword}
                                    placeholder="Mật Khẩu Mới"
                                    onChange={this.onChangeinputNewPassword}
                                />
                            </div>
                            <div class="form-group col-md-5">
                                <label className="profile-info-label" for="inputPasswordRe">Nhập lại Mật Khẩu mới</label>
                                <input 
                                    type="password"
                                    class="form-control profile-input"
                                    id="inputPasswordRe" 
                                    value={this.state.inputReNewPassword} 
                                    placeholder="Mật Khẩu Mới"
                                    onChange={this.onChangeinputReNewPassword}
                                />
                            </div>
                        </center>

                        <label 
                            for="inputState" 
                            id="warning" 
                            hidden={!error}>
                            {errorMessage}
                        </label>
                        <br/>
                        <button 
                            type="submit" 
                            class="btn btn-info"
                            onClick={this.handleConfirm}
                            disabled={running}
                        >
                            Thay mật khẩu
                        </button>
                    </form>
                }
            </div>
        )
    }
}


{/*



*/}