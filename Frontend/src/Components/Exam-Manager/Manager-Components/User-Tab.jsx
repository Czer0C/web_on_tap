import React, { Component } from 'react';

export default class UserTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    getUsers() {
        fetch("https://web-tv-5.herokuapp.com/nguoidung/lay", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer 669`
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                users: res
            })
            
        }); 
    }
    componentDidMount() {
        this.getUsers()
    }
    renderUserType(key) {
        switch (key) {
            case 1:
                return "Học Sinh";
            case 2:
                return "Giáo Viên";
            case 3:
                return "Admin";
        }
    }

    render() {
        const {
            users
        } = this.state
        
        return(
            <div>
                {
                    users.length === 0 ? null :
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="text-center"><b>#</b></th>
                                <th class="text-center"><b>Họ Tên</b></th>
                                <th class="text-center"><b>Lớp</b></th>
                                <th class="text-center"><b>Điểm Tích Lũy</b></th>                                
                                <th class="text-center"><b>Email</b></th>
                                <th class="text-center"><b>Tên Đăng Nhập</b></th>
                                <th class="text-center"><b>Loại Người Dùng</b></th>
                                <th class="text-right"><b>Thao Tác</b></th>
                            </tr>
                        </thead>
                    <tbody>
                            {
                                users.map((row, index) => (
                                    <tr id={`exam-id-${row.MaNguoiDung}`}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{row.HoTen}</td>
                                        <td className="text-center">{row.Lop}</td>
                                        <td className="text-center">{row.DiemTichLuy}</td>
                                        <td className="text-center">{row.Email}</td>
                                        <td className="text-center">{row.TenDangNhap}</td>
                                        <td className="text-center">{this.renderUserType(row.LoaiNguoiDung)}</td>
                                        <td class="td-actions text-right">
                                            <button type="button" rel="tooltip" class="btn btn-success btn-simple">
                                                <i class="material-icons">edit</i>
                                            </button>
                                            <button type="button" rel="tooltip" class="btn btn-danger btn-simple">
                                                <i class="material-icons">close</i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                }
            </div>
        
        )
    }
}