import React, {Component} from 'react';
import './Info.css';

export default class InfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        } = this.props
    }

    componentDidMount() {
        
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
            info
        } = this.state
        return (
            <div>
                {   
                    !info ? 
                    <img id="loading" src="https://i.imgur.com/FMpRIoS.gif"></img>  : 
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label className="profile-info-label" for="inputUsername">Tên Đăng Nhập</label>
                                <input type="text" class="form-control profile-input" id="inputUsername" value={info.TenDangNhap} placeholder="Tên Đăng Nhập"/>
                            </div>
                            <div class="form-group col-md-6">
                                <label className="profile-info-label" for="inputEmail4">Email</label>
                                <input type="email" class="form-control profile-input" id="inputEmail4" value={info.Email} placeholder="Email"/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div class="form-group col-md-6">
                                <label className="profile-info-label" for="inputFullname">Họ Tên</label>
                                <input type="text" class="form-control profile-input" id="inputFullname" value={info.HoTen} placeholder="Họ Tên"/>
                            </div>
                            <div class="form-group col-md-6">
                                <label className="profile-info-label" for="inputGrade">Lớp</label>
                                <select id="inputGrade" class="form-control profile-input">
                                    <option selected>{info.Lop}</option>
                                    <option>...</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">    
                            <div class="form-group col-md-6 ml-auto">
                                <label className="profile-info-label" for="inputUserType">Loại Người Dùng</label>
                                <input type="text" class="form-control" id="inputUserType" value={this.renderUserType(info.LoaiNguoiDung)} disabled/>
                            </div>
                            <div class="form-group col-md-6 ml-auto">
                                <label className="profile-info-label" for="inputEXP">Điểm Tích Lũy</label>
                                <input type="text" class="form-control" id="inputEXP" value={info.DiemTichLuy} disabled/>
                            </div>
                        </div>



                        <button type="submit" class="btn btn-info">Cập Nhật</button>
                    </form>
                }
            </div>
        )
    }
}


{/*

<div class="form-row">
                            <div class="form-group col-md-4">
                                <label className="profile-info-label" for="inputPassword">Mật Khẩu Cũ</label>
                                <input type="password" class="form-control" id="inputPassword" value={""} placeholder="Mật Khẩu Cũ"/>
                            </div>
                            <div class="form-group col-md-4">
                                <label className="profile-info-label" for="inputNewPassword">Mật Khẩu Mới</label>
                                <input type="password" class="form-control" id="inputNewPassword" value={""} placeholder="Mật Khẩu Mới"/>
                            </div>
                            <div class="form-group col-md-4">
                                <label className="profile-info-label" for="inputPasswordRe">Nhập lại Mật Khẩu mới</label>
                                <input type="password" class="form-control" id="inputPasswordRe" value={""} placeholder="Mật Khẩu Mới"/>
                            </div>
                        </div>

*/}