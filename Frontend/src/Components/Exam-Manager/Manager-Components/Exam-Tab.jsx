import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import ExamDetail from './Exam-Detail';
import { NavLink } from "react-router-dom";     
export default class ExamTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            currentDetail: null,
            open: false
        }
        this.handleDetail = this.handleDetail.bind(this)
    }
    onOpenModal = () => {
        this.setState({ open: true });
      };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };
    getExams() {
        fetch("https://web-tv-5.herokuapp.com/baikiemtra/lay", {
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
                    exams: res.exams
                })
            }
            else {
                alert("Lỗi: " + res.message)
            }
        }); 
    }
    componentDidMount() {
        this.getExams()
    }
    renderSemester(key) {
        switch (key) {
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

    handleDetail(event) {
        let index = event.target.id.split("-")[0]
        
        this.setState({
            currentDetail: this.state.exams[index],
            open: true
        })
    }
    render() {
        const {
            exams,
            currentDetail,
            open
        } = this.state

        return(
            <div>
                
                {/* <button className="btn btn-info pull-right" >Thêm</button> */}
                <NavLink className="btn btn-primary nav-link pull-right" activeClassName="nav-link active" to="/admin/add">
                    <i class="material-icons">&nbsp;add</i>Thêm&nbsp;
                </NavLink>
                {
                    exams.length === 0 ? null :
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="text-center"><b>#</b></th>
                                <th class="text-center"><b>Tên Bài Kiểm Tra</b></th>
                                <th class="text-center"><b>Học Kỳ</b></th>
                                <th class="text-center"><b>Lớp</b></th>
                                <th class="text-center"><b>Thời Gian</b></th>
                                <th class="text-right"><b>Thao Tác</b></th>
                            </tr>
                        </thead>
                    <tbody>
                            {
                                exams.map((row, index) => (
                                    <tr id={`exam-id-${row.MaBaiKiemTra}`}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{row.TenBaiKiemTra}</td>
                                        <td className="text-center">{this.renderSemester(row.MaHocKy)}</td>
                                        <td className="text-center">{row.Lop}</td>
                                        <td className="text-center">{row.ThoiGian}</td>
                                        <td class="td-actions text-right">
                                            <button 
                                                id={`${index}-btn-detail-exam-id`}
                                                type="button" 
                                                rel="tooltip" 
                                                class="btn btn-info btn-simple"
                                                onClick={this.handleDetail}
                                            >
                                                <i id={`${index}-icon-detail-exam-id`} class="material-icons">info</i>
                                            </button>
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
                <Modal open={open} onClose={this.onCloseModal} center>
                    <ExamDetail detail={currentDetail} onDismiss={this.onCloseModal}/>
                </Modal>
            </div>
        
        )
    }
}