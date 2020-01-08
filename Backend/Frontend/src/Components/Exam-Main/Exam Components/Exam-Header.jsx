import React, { Component } from 'react';

export default class ExamHeader extends Component {
    constructor(props) {
        super(props) 
        this.state = {

        }
    }

    componentDidMount() {
        let info = JSON.parse(this.props.data)
        
        this.setState({
            examName: info[0].TenBaiKiemTra,
            grade: info[0].Lop,
            semester: info[0].MaHocKy

        })
    }
    renderSemester(semesterID) {
        switch (semesterID) {
            case 1: 
                return "Giữa Học Kỳ 1";
            case 2: 
                return "Cuối Học Kỳ 1";
            case 3: 
                return "Giữa Học Kỳ 2";
            case 4: 
                return "Cuối Học Kỳ 2";
        
        }
    }
    render() {
        const {
            examName,
            grade,
            semester
        } = this.state

        return (
            <div className="row">
                <div className="col">
                    <center>
                        <div class="card">
                            <div class="card-body">
                                <h2 class="card-title">{examName}</h2>
                                <h4 class="card-subtitle mb-2 text-muted">Lớp {grade} - {this.renderSemester(semester)}</h4>
                                <h4><i>Dựa vào nội dung bài đọc, khoanh vào chữ cái trước câu trả lời đúng nhất</i></h4>
                                <h4><i>Nhấp vào nút "Bắt đầu" để hiển thị thông tin và làm bài.</i></h4>
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        )
    }
}