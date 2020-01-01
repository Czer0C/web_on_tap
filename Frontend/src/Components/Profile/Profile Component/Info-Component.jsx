import React, {Component} from 'react';
import './Info.css';
import Modal from 'react-responsive-modal'; 

import { getFromStorage, setInStorage } from '../../../utility/storage.js';

export default class InfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUsername: this.props.info.TenDangNhap,
            inputEmail: this.props.info.Email,
            inputFullname: this.props.info.HoTen,
            inputGrade: this.props.info.Lop,
            error: false,
            errorMessage: '',
            errorCode: NaN,
            running: false
        }
        this.handleChangeInputUsername = this.handleChangeInputUsername.bind(this)
        this.handleChangeInputEmail = this.handleChangeInputEmail.bind(this)
        this.handleChangeInputFullname = this.handleChangeInputFullname.bind(this)
        this.handleChangeInputGrade = this.handleChangeInputGrade.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    handleChangeInputUsername(event){this.setState({inputUsername:event.target.value})}
    handleChangeInputEmail(event){this.setState({inputEmail:event.target.value})}
    handleChangeInputFullname(event){this.setState({inputFullname:event.target.value})}
    handleChangeInputGrade(event){this.setState({inputGrade:event.target.value})}

    componentDidMount() {
    }

    handleUpdate(event) {
        event.preventDefault()
        this.setState({
            running: true
        })
        fetch(`http://localhost:9000/nguoidung/capnhatthongtin`, {
                method: `PATCH`,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer 669`
                },
                body: JSON.stringify({
                    id: this.props.info.MaNguoiDung,
                    info: this.state
                })
            })
            .then((res) => res.json())
            .then((json) => {
                let sg = getFromStorage('signin')
                sg.username = this.state.inputUsername
                sg.userGrade = this.state.inputGrade
                if (json.success) {

                    setInStorage('signin', sg);
                    this.setState({
                        running: false,
                        error: false
                    })
                   alert("Cập nhật thành công.")
                   
                    window.location.replace('//localhost:3000/canhan');
                   
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
    renderUserType(type) {
        switch (type) {
            case 1: 
                return "Học Sinh"
            case 2:
                return "Giáo Viên"
            case 3:
                return "Admin"
        }
    }

    render() {
        const {
            inputUsername,
            inputEmail,
            inputFullname,
            inputGrade,
            error,
            errorMessage,
            running,
            errorCode
        } = this.state
        return (
            <div>
                {   
                    !this.state ? 
                    <img id="loading" src="https://i.imgur.com/FMpRIoS.gif"></img>  : 
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label className="profile-info-label" for="inputUsername">Tên Đăng Nhập</label>
                                
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        class="form-control profile-input" 
                                        id="inputUsername" 
                                        value={inputUsername} 
                                        placeholder="Tên Đăng Nhập"
                                        onChange={this.handleChangeInputUsername}
                                    />
                                    <div 
                                        className="col-md-2 error" 
                                        hidden={!error || !(errorCode === 1 || errorCode === 7)}>
                                        <span class="input-group-addon error">
                                            <i class="material-icons">error</i>
                                        </span>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="form-group col-md-6">
                                <label className="profile-info-label" for="inputEmail4">Email</label>
                                <div className="input-group">
                                <input 
                                    type="email" 
                                    class="form-control profile-input" 
                                    id="inputEmail4" 
                                    value={inputEmail} 
                                    placeholder="Email"
                                    onChange={this.handleChangeInputEmail}
                                />
                                <div 
                                    className="col-md-1 error" 
                                    hidden={!error || !(errorCode === 2 || errorCode === 8)}>
                                    <span class="input-group-addon error">
                                        <i class="material-icons">error</i>
                                    </span>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div class="form-group col-md-6">
                                <label className="profile-info-label" for="inputFullname">Họ Tên</label>
                                <div className="input-group">
                                <input 
                                    type="text" 
                                    class="form-control profile-input" 
                                    id="inputFullname" 
                                    value={inputFullname} 
                                    placeholder="Họ Tên"
                                    onChange={this.handleChangeInputFullname}
                                />
                                <div 
                                    className="col-md-1 error" 
                                    hidden={!error || !(errorCode === 3)}>
                                    <span class="input-group-addon error">
                                        <i class="material-icons">error</i>
                                    </span>
                                </div>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label className="profile-info-label" for="inputGrade">Lớp</label>
                                <div className="input-group">
                                <select 
                                    id="inputGrade" 
                                    class="form-control profile-input" 
                                    onChange={this.handleChangeInputGrade}
                                >
                                    <option selected={inputGrade === 1} value="1">1</option>
                                    <option selected={inputGrade === 2} value="2">2</option>
                                    <option selected={inputGrade === 3} value="3">3</option>
                                    <option selected={inputGrade === 4} value="4">4</option>                                    
                                    <option selected={inputGrade === 5} value="5">5</option>
                                </select>
                                <div 
                                    className="col-md-1 error" 
                                    hidden={!error || !(errorCode === 4 || errorCode === 5 || errorCode === 6)}>
                                    <span class="input-group-addon error">
                                        <i class="material-icons">error</i>
                                    </span>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">    
                            <div class="form-group col-md-6 ml-auto">
                                <label className="profile-info-label" for="inputUserType">Loại Người Dùng</label>
                                <input type="text" class="form-control" id="inputUserType" value={this.renderUserType(this.props.info.LoaiNguoiDung)} disabled/>
                            </div>
                            <div class="form-group col-md-6 ml-auto">
                                <label className="profile-info-label" for="inputEXP">Điểm Tích Lũy</label>
                                <input type="text" class="form-control" id="inputEXP" value={this.props.info.DiemTichLuy} disabled/>
                            </div>
                        </div>

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
                            onClick={this.handleUpdate}
                            disabled={running}
                        >
                            Cập Nhật
                        </button>
                    </form>
                }
            </div>
        )
    }
}