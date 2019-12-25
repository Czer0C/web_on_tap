import React, {Component} from 'react';
import './Info.css';

export default class InfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        } = this.props
    }

    getUserInfo() {
        fetch("http://localhost:9000/nguoidung/lay/" + this.state.userID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer 669`
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({
                info: res.info[0]
            })
        }); 
    }
    componentDidMount() {
        this.getUserInfo()
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
                            <label className="profile-info-label" for="inputEmail4">Email</label>
                            <input type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
                            </div>
                            <div class="form-group col-md-6">
                            <label className="profile-info-label" for="inputPassword4">Password</label>
                            <input type="password" class="form-control" id="inputPassword4" placeholder="Password"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label className="profile-info-label" for="inputAddress">Họ Tên</label>
                            <input type="text" class="form-control" id="inputAddress" value={info.HoTen}/>
                        </div>
                        <div class="form-group">
                            <label className="profile-info-label" for="inputAddress2">Tên Đăng Nhập</label>
                            <input type="text" class="form-control" id="inputAddress2" value={info.TenDangNhap}/>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label className="profile-info-label" for="inputCity">City</label>
                            <input type="text" class="form-control" id="inputCity"/>
                            </div>
                            <div class="form-group col-md-3">
                            <label className="profile-info-label" for="inputState">Lớp</label>
                            <select id="inputState" class="form-control">
                                <option selected>{info.Lop}</option>
                                <option>...</option>
                            </select>
                            </div>
                            <div class="form-group col-md-2 ml-auto">
                            <label className="profile-info-label" for="inputZip">Điểm Tích Lũy</label>
                            <input type="text" class="form-control" id="inputZip" value={info.DiemTichLuy} disabled/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                            <label className="profile-info-label" class="form-check-label">
                                <input class="form-check-input" type="checkbox" value=""/>
                                Check me out
                                <span class="form-check-sign">
                                    <span class="check"></span>
                                </span>
                            </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-info">Cập Nhật</button>
                    </form>
                }
            </div>
        )
    }
}
