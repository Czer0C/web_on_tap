import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

export default class ExamDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            questions: [],
            choices: [],
            show: false
        }
    }
    getQA() {
        fetch("https://web-tv-5.herokuapp.com/baikiemtra/laychitiet/" + this.props.detail.MaBaiKiemTra, {
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
                        
                    })
                }
                else {
                    alert("Lỗi: " + res.message)
                }
        }); 
    }
    componentDidMount() {
        this.getQA()
    }

    splitParagraph(content) {
        if (typeof(content) === undefined) return
        
        var s = content.split("\n")
        return s;
    }
    render() {
        const {
            detail
        } = this.props

        const {
            show
        } = this.state
        return(
            <div>
                {
                    !detail ? null :
                    <div >
                    <div class="modal-header">
                        <h2 class="modal-title">Chi tiết bài kiểm tra</h2>
                    </div>
                    <div class="modal-body">
                        <p><b>Tựa đề bài đọc</b>: {detail.TuaDe}</p>
                        <p><b>Nội dung bài đọc</b>:</p>
                        <button className="btn btn-info" onClick={()=>{this.setState({show: !show})}}>
                            {!show ? "Hiển Thị" : "Ẩn"}
                        </button>
                        <div className="paragraph" hidden={!show}>
                            {this.splitParagraph(detail.NoiDungBaiDoc).map((paragraph, index) => (<p>{paragraph}</p>))}
                        </div>
                        <p><b>Tác giả</b>: {detail.TenTacGia}</p>
                        <p><b>Ghi chú</b>: {detail.GhiChu}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" onClick={this.props.onDismiss}>Đóng</button>
                    </div>
                </div>
                }
            </div>
        )
    }
}