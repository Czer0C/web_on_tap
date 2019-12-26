import React, {Component} from 'react';

import Modal from 'react-responsive-modal'; 

export default class ProgressComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        } = this.props

        this.onCloseModal = this.onCloseModal.bind(this)
        this.onOpenModal = this.onOpenModal.bind(this)
    }

    getSection() {
        fetch("http://localhost:9000/phienlambai/lay/" + this.props.info.MaNguoiDung, {
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
                    sections: res.sections
                })
            }
            else {
                alert("Lỗi: " + res.message)
            }
        }); 
    }

    componentDidMount() {
        this.setState({
            open: false
        })
        this.getSection()
    }
    onOpenModal = () => {
        this.setState({ open: true });
      };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };
    render() {
        const {
            sections,
            open
        } = this.state

        return (
            <div>
                {
                    !sections ? 
                    <img id="loading" src="https://i.imgur.com/FMpRIoS.gif"></img> :
                    <div>

<table class="table">
                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th>Mã Bài Kiểm Tra</th>
                                <th>Thời Gian Bắt Đầu</th>
                                <th>Thời Gian Kết Thúc</th>
                                <th class="text-right">Điểm Số</th>
                                <th class="text-right">Tình Trạng</th>
                                <th class="text-right">Chi Tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sections.map((item, index) => (
                                    <tr>
                                        <td class="text-center">{index + 1}</td>
                                        <td>{item.MaBaiKiemTra}</td>
                                        <td>{item.ThoiGianBatDau}</td>
                                        <td>{item.ThoiGianKetThuc}</td>
                                        <td class="text-right">{item.DiemSo}</td>
                                        <td class="text-right">{item.KetThuc === 1 ? "Hoàn Thành" : "Chưa Hoàn Thành"}</td>
                                        <td class="td-actions text-right">
                                            <button 
                                                type="button" 
                                                rel="tooltip" 
                                                class="btn btn-info" 
                                                id={`get-info-exam-${item.MaPhienLamBai}`}
                                                onClick={this.onOpenModal}
                                            >
                                                <i class="material-icons">info</i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                
                 <Modal open={open} onClose={this.onCloseModal} center>
                        <div>
                            <div class="modal-header">
                                <h3 class="modal-title" id="exampleModalLabel">
                                   Chi Tiết Bài Làm
                                </h3>
                            </div>
                            {
                                <div class="modal-body">
                                    <p>
                                        Tên Bài Kiểm Tra: 
                                    </p>
                                </div>
                            }
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onClick={this.onCloseModal}>Đóng</button>
                            </div>
                        </div>
                        
                    </Modal>
                    </div>
                    }
            </div>
        )
    }
}
