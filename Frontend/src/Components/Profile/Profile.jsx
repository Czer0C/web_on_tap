import React, {Component} from 'react';
import InfoComponent from './Profile Component/Info-Component';
import ProgressComponent from './Profile Component/Progress-Component';


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }
    render() {
        return (
            <div className="product-page">
    
                    <div className="section section-gray">
                        <div className="container">
                        <div className="main main-raised nav-justified">
                <div class="card card-nav-tabs card-plain">
    <div class="card-header card-header-success">
        {/* <!-- colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" --> */}
        <div class="nav-tabs-navigation">
            <div class="nav-tabs-wrapper">
                <ul class="nav nav-tabs" data-tabs="tabs">
                    <li class="nav-item">
                        <a class="nav-link active" href="#home" data-toggle="tab"><i class="material-icons">face</i>Thông tin cá nhân</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#updates" data-toggle="tab"><i class="material-icons">show_chart</i>Quá trình ôn tập</a>
                    </li>
                </ul>
            </div>
        </div>
    </div><div class="card-body ">
        <div class="tab-content">
            <div class="tab-pane active" id="home">
                <InfoComponent {...this.props}/>
            </div>
            <div class="tab-pane" id="updates">
                <ProgressComponent {...this.props}/>
            </div>
        </div>
    </div>
  </div>
            </div>
            
            
                        </div>
                        </div></div>
           
        )
    }


}


{/*

<form class="form">
                                        <div class="card ">
                                            <div class="card-header ">
                                            <h4 class="card-title">Edit Profile</h4>
                                            </div>
                                            <div class="card-body ">
                                                <div class="row">
                                                    <div class="col-md-5 pr-1">
                                                        <div class="form-group">
                                                            <label>Company (disabled)</label>
                                                            <input type="text" class="form-control" disabled="" placeholder="Company" value="Creative Code Inc."/>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3 px-1">
                                                        <div class="form-group">
                                                            <label>Username</label>
                                                            <input type="text" class="form-control" placeholder="Username" value="michael23"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 pl-1">
                                                        <div class="form-group">
                                                            <label for="exampleInputEmail1">Email address</label>
                                                            <input type="email" class="form-control" placeholder="Email"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12 pr-1">
                                                        <div class="form-group">
                                                            <label>First Name</label>
                                                            <input type="text" class="form-control" placeholder="Company" value="Mike"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 pr-1">
                                                        <div class="form-group">
                                                            <label>New Pass</label>
                                                            <input type="text" class="form-control" placeholder="Company" value="Mike"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 pr-1">
                                                        <div class="form-group">
                                                            <label>First Name</label>
                                                            <input type="text" class="form-control" placeholder="Company" value="Mike"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <button type="submit" class="btn btn-info btn-fill pull-right">Update Profile</button>
                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
                                    </form>
                               


*/}