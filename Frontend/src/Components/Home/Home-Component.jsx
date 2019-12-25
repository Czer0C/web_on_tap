import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            displayData: [],
            userID: this.props.userID,
            userGrade: this.props.userGrade
        }
        this.filterList = this.filterList.bind(this);
    }
    getExam() {
        fetch("http://localhost:9000/baikiemtra/lay", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer 669`
            }
        })
        .then(res => res.text())
        .then(res => {
            var temp = JSON.parse(res)
            if (this.state.userGrade !== -1) {      
                temp = temp.filter((item) => {
                    return item["Lop"] === parseInt(this.state.userGrade)
                })
            }
            this.setState({
                data: JSON.parse(res),
                displayData: temp
            })
            
        }); 
    }
    renderSemester(semesterID) {
        switch (semesterID) {
            case 1:
                return "Giữa Học Kỳ I";
            case 2:
                return "Cuối Học Kỳ I";
            case 3:
                return "Giữa Học Kỳ II";
            case 4:
                return "Cuối Học Kỳ II";
            
        }
    }
    componentDidMount() {
        this.getExam()
    }
    filterList(event) {
        var data = this.state.data
        var query = event.target.id;
        var value = parseInt(event.target.id[event.target.id.length - 1])
        if (value !== 0) {
            if (query.search("semester") !== -1) {
                data = data.filter((item) => {
                    return item["MaHocKy"] === value
                })
            }
            else {
                data = data.filter((item) => {
                    return item["Lop"] === value
                })
            } 
        }
        this.setState({
            displayData: data
        })
    }
    render() {
        const {
            displayData,
            open
        } = this.state
    
        const cardStyle = {
            "width": "20rem"
        }
        return (
            <div className="product-page">
                {
                    displayData === [] ? 
                    <img src="https://i.imgur.com/FMpRIoS.gif"></img> : 
                    <div className="section section-gray">
                        <div className="container">
                            <div class="main main-raised main-product">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Lớp
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" id="btn-grade-0" onClick={this.filterList}>Tất cả</a>
                                        <a class="dropdown-item" id="btn-grade-1" onClick={this.filterList}>1</a>
                                        <a class="dropdown-item" id="btn-grade-2" onClick={this.filterList}>2</a>
                                        <a class="dropdown-item" id="btn-grade-3" onClick={this.filterList}>3</a>
                                        <a class="dropdown-item" id="btn-grade-4" onClick={this.filterList}>4</a>
                                        <a class="dropdown-item" id="btn-grade-5" onClick={this.filterList}>5</a>
                                    </div>
                                </div>
                                <center>
                                    <ul class="nav justify-content-center">
                                        <li class="nav-item">
                                            <button class="btn btn-info" id="btn-semester-0" onClick={this.filterList}>Tất cả</button>
                                        </li>
                                        <li class="nav-item">
                                            <button class="btn btn-info" id="btn-semester-1" onClick={this.filterList}>Giữa Học Kỳ I</button>
                                        </li>
                                        <li class="nav-item">
                                            <button class="btn btn-info" id="btn-semester-2" onClick={this.filterList}>Cuối Học Kỳ I</button>
                                        </li>
                                        <li class="nav-item">
                                            <button class="btn btn-info" id="btn-semester-3" onClick={this.filterList}>Giữa Học Kỳ II</button>
                                        </li>
                                        <li class="nav-item">   
                                            <button class="btn btn-info" id="btn-semester-4" onClick={this.filterList}>Cuối Học Kỳ II</button>
                                        </li>
                                    </ul>   
                                    <h2>Các bài kiểm tra hiện tại</h2>    
                                                            
                                </center>
                                {
                                    displayData.length === 0 ? <div>Không tìm thấy...</div> : 
                                    <div class="row">
                                    {
                                        displayData.map((item, index) => (
                                            <div class="col-sm-4">
                                            <div class="card" style={cardStyle}>

                                            <div class="card-body">
                                            <h4 class="card-title">{item.TenBaiKiemTra}</h4>
                                            <h6 class="card-subtitle mb-2 text-muted">Khối {item.Lop} - {this.renderSemester(item.MaHocKy)}</h6>
                                            <p class="card-text">Bài đọc: <b>{item.TuaDe}</b> <br/> Thời gian làm bài: <b>{item.ThoiGian} phút</b></p>

                                            <NavLink 
                                                to={"/luyen/" + item.MaBaiKiemTra}
                                                class="card-link"
                                            >
                                                Làm bài
                                            </NavLink>
                                        </div>
                                    </div>
                                    </div>
                                        ))
                                    }
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                    
                }
            </div>

        )
    }
}