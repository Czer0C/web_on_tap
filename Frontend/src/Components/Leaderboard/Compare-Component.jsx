import React, { Component } from 'react';

export default class CompareComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            displayData: []
        }
        this.filterList = this.filterList.bind(this)
    }

    getData() {
        fetch("http://localhost:9000/users/laynguoidung")
        .then(res => res.text())
        .then(res => {
            //console.log(res)
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
        var value = event.target.id[event.target.id.length - 1] - 1 // lấy mã lớp theo button ID
        if (value === 0) {
            this.setState({
                displayData: data
            })
        }
        else {
            var list = data.filter((item) => {
                return item["Lop"] === parseInt(value)
            })
            this.setState({
                displayData: list
            })
        }
    }

    render() {
        const {
            data,
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
                                        <button class="btn btn-info" id="btn-grade-1" onClick={this.filterList}>Tất cả</button>
                                    </li>
                                    <li class="nav-item">
                                        <button class="btn btn-info" id="btn-grade-2" onClick={this.filterList}>Lớp 1</button>
                                    </li>
                                    <li class="nav-item">
                                        <button class="btn btn-info" id="btn-grade-3" onClick={this.filterList}>Lớp 2</button>
                                    </li>
                                    <li class="nav-item">
                                        <button class="btn btn-info" id="btn-grade-4" onClick={this.filterList}>Lớp 3</button>
                                    </li>
                                    <li class="nav-item">   
                                        <button class="btn btn-info" id="btn-grade-5" onClick={this.filterList}>Lớp 4</button>
                                    </li>
                                    <li class="nav-item">   
                                        <button class="btn btn-info" id="btn-grade-6" onClick={this.filterList}>Lớp 5</button>
                                    </li>
                                </ul>   
                                <h2>Bảng Xếp Hạng</h2>                            
                            </center>
                            {
                                displayData.length === 0 ? <div>Không tìm thấy...</div> : 
                                <div class="row">
                                
                                    <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="text-center">#</th>
                                            <th>Họ Tên</th>
                                            <th>Điểm Tích Lũy</th>
                                            <th>Xếp loại</th>
                                            <th>Khen Thưởng</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                    {
                                        displayData.map((item, index) => <tr>
                                            <td class="text-center">{index + 1}</td>
                                            <td>{item.HoTen}</td>
                                            <td>{item.DiemTichLuy}</td>
                                            <td>TBA</td>
                                            <td class="text-right">TBA</td>
                                        </tr>)
                                    }

                                        
                                    </tbody>
                                </table>
                                



                                
                            </div>
                            
                            }
                          
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}