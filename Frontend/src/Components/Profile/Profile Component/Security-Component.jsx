import React, {Component} from 'react';
import './Info.css';

export default class SecurityComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        } = this.props
    }

    componentDidMount() {
        
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
                        <center>
                        <div class="form-group col-md-5">
                                <label className="profile-info-label" for="inputPassword">Mật Khẩu Cũ</label>
                                <input type="password" class="form-control profile-input" id="inputPassword" value={""} placeholder="Mật Khẩu Cũ"/>
                            </div>
                            <div class="form-group col-md-5">
                                <label className="profile-info-label" for="inputNewPassword">Mật Khẩu Mới</label>
                                <input type="password" class="form-control profile-input" id="inputNewPassword" value={""} placeholder="Mật Khẩu Mới"/>
                            </div>
                            <div class="form-group col-md-5">
                                <label className="profile-info-label" for="inputPasswordRe">Nhập lại Mật Khẩu mới</label>
                                <input type="password" class="form-control profile-input" id="inputPasswordRe" value={""} placeholder="Mật Khẩu Mới"/>
                            </div>
                        </center>

                        <button type="submit" class="btn btn-info">Thay mật khẩu</button>
                    </form>
                }
            </div>
        )
    }
}


{/*



*/}