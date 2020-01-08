import React, {Component} from 'react';
import InfoComponent from './Profile Component/Info-Component';
import ProgressComponent from './Profile Component/Progress-Component';
import SecurityComponent from './Profile Component/Security-Component';


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getUserInfo() {
        fetch("https://web-tv-5.herokuapp.com/nguoidung/lay/" + this.props.userID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer 669`
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                this.setState({
                    info: res.info[0]
                })
            }
            else {
                alert("Lỗi: " + res.message)
            }
            
        }); 
    }
    componentDidMount() {

        this.getUserInfo()
    }

    render() {
        return (
            <div className="product-page">
    
                    <div className="section section-gray">
                        <div className="container">
                        <div className="main main-raised nav-justified"> 
                        {
                            !this.state.info ? 
                            <img id="loading" src="https://i.imgur.com/FMpRIoS.gif"></img> :
                            <div class="card card-nav-tabs card-plain">
                <div class="card-header card-header-success">
                    {/* <!-- colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" --> */}
                        <div class="nav-tabs-navigation">
                        <div class="nav-tabs-wrapper">
                            <ul class="nav nav-tabs" data-tabs="tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" href="#general" data-toggle="tab"><i class="material-icons">face</i>Thông tin tổng quát</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#password" data-toggle="tab"><i class="material-icons">security</i>Đổi mật khẩu</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#progress" data-toggle="tab"><i class="material-icons">show_chart</i>Quá trình ôn tập</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
                {
                   !this.state.info ? null :
                    <div class="card-body ">
                    <div class="tab-content">
                        <div class="tab-pane active" id="general">
                            <InfoComponent {...this.state}/>
                        </div>
                        <div class="tab-pane" id="password">
                            <SecurityComponent {...this.state}/>
                        </div>
                        <div class="tab-pane" id="progress">
                            <ProgressComponent {...this.state}/>
                        </div>
                    </div>
                </div>
                }
            </div>
                        }
            </div>
            </div>
            </div></div>
        )
    }
}