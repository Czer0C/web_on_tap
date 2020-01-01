import React, {Component} from 'react';
import './Info.css';
import Modal from 'react-responsive-modal'; 

export default class InfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUsername: this.props.info.TenDangNhap,
            inputEmail: this.props.info.Email,
            inputFullname: this.props.info.HoTen,
            inputGrade: this.props.info.Lop
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
            inputGrade
        } = this.state
        return (
            <div>
                {   
                    !inputFullname ? 
                    <img id="loading" src="https://i.imgur.com/FMpRIoS.gif"></img>  : 
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label className="profile-info-label" for="inputUsername">Tên Đăng Nhập</label>
                                <input 
                                    type="text" 
                                    class="form-control profile-input" 
                                    id="inputUsername" 
                                    value={inputUsername} 
                                    placeholder="Tên Đăng Nhập"
                                    onChange={this.handleChangeInputUsername}
                                />
                            </div>
                            <div class="form-group col-md-6">
                                <label className="profile-info-label" for="inputEmail4">Email</label>
                                <input 
                                    type="email" 
                                    class="form-control profile-input" 
                                    id="inputEmail4" 
                                    value={inputEmail} 
                                    placeholder="Email"
                                    onChange={this.handleChangeInputEmail}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div class="form-group col-md-6">
                                <label className="profile-info-label" for="inputFullname">Họ Tên</label>
                                <input 
                                    type="text" 
                                    class="form-control profile-input" 
                                    id="inputFullname" 
                                    value={inputFullname} 
                                    placeholder="Họ Tên"
                                    onChange={this.handleChangeInputFullname}
                                />
                            </div>
                            <div class="form-group col-md-6">
                                <label className="profile-info-label" for="inputGrade">Lớp</label>
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



                        <button 
                            type="submit" 
                            class="btn btn-info" 
                            onClick={this.handleUpdate}
                        >
                            Cập Nhật
                        </button>
                    </form>
                }
            </div>
        )
    }
}