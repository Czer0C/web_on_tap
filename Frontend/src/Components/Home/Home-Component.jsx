import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            displayData: []
        }
        this.filterList = this.filterList.bind(this)
    }

    getData() {
        fetch("http://localhost:9000/users/laybaikiemtra")
        .then(res => res.text())
        .then(res => {
            this.setState({
                data: JSON.parse(res),
                displayData: JSON.parse(res)
            })
            
        }); 
    }

    componentDidMount() {
        this.getData()
    }

    filterList(event) {
        var data = this.state.data
        var value = event.target.id[event.target.id.length - 1] - 1
        if (value === 0) {
            this.setState({
                displayData: data
            })
        }
        else {
            var list = data.filter((item) => {
                return item["MaHocKy"] === parseInt(value)
            })
            this.setState({
                displayData: list
            })
        }
    }

    render() {
        const {
            displayData
        } = this.state
    
        const cardStyle = {
            "width": "20rem"
        }
        return (
            <div className="product-page">
                <div className="section section-gray">
                    <div className="container">
                        <div class="main main-raised main-product">
                            <center>
                                <ul class="nav justify-content-center">
                                    <li class="nav-item">
                                        <button class="btn btn-info" id="btn-semester-1" onClick={this.filterList}>Tất cả</button>
                                    </li>
                                    <li class="nav-item">
                                        <button class="btn btn-info" id="btn-semester-2" onClick={this.filterList}>Giữa Học Kỳ I</button>
                                    </li>
                                    <li class="nav-item">
                                        <button class="btn btn-info" id="btn-semester-3" onClick={this.filterList}>Cuối Học Kỳ I</button>
                                    </li>
                                    <li class="nav-item">
                                        <button class="btn btn-info" id="btn-semester-4" onClick={this.filterList}>Giữa Học Kỳ II</button>
                                    </li>
                                    <li class="nav-item">   
                                        <button class="btn btn-info" id="btn-semester-5" onClick={this.filterList}>Cuối Học Kỳ II</button>
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
                                        <h6 class="card-subtitle mb-2 text-muted">Khối {item.Lop}</h6>
                                        <p class="card-text">{item.TuaDe}</p>

                                        <NavLink to="/luyen" class="card-link">Làm bài</NavLink>
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
            </div>

        )
    }
}