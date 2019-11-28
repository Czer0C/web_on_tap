import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    getData() {
        fetch("http://localhost:9000/users/laybaikiemtra")
        .then(res => res.text())
        .then(res => {
            this.setState({
                data: JSON.parse(res)
            })
            
        }); 
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const {
            data
        } = this.state
        
        

        const cardStyle = {
            "width": "20rem"
        }

        if (data.length === 0) {
            return <span>Loading...</span>;
        }

        const rowCount = Math.ceil(data.length / 3)        

        return (
            <div className="product-page">
                <div className="section section-gray">
                    <div className="container">
                        <div class="main main-raised main-product">
                            <center><h2>Các bài kiểm tra hiện tại</h2></center>

                            <div class="row">
                                {
                                    data.map((item, index) => (
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
                            
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}