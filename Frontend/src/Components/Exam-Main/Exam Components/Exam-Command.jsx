import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

export default class ExamCommand extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.command = this.command.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onConfirm = this.onConfirm.bind(this)

    }
    onOpenModal = () => {
        this.setState({ open: true });
      };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };
    command() {
        this.onOpenModal()
    }
    onConfirm() {
        if (this.props.status === 0) {
            this.props.onChangeCommand(1)
            this.startTime()
            this.setState({
                open: false
            })
        }
        else {
            this.props.onChangeCommand(2)
            this.getDuration()
        }
        
    }

    getDuration() {
        let examInfo = JSON.parse(this.props.examInfo)
        

        var result = parseInt(examInfo[0].ThoiGian) * 60 - this.state.seconds
        this.setState({
            duration: `${Math.floor(result / 60)}:${result % 60}`
        })
        this.props.onChangeDuration(result)
    }

    startTime() {
        this.myInterval = setInterval(() => {
            let s = this.state.seconds
            if (s > 0) {
                this.setState({
                    seconds: s - 1
                })
            }
            else { // Hết giờ
                this.props.onChangeCommand(2)
            }
            if (this.props.status === 2) { // Nộp bài sớm
                clearInterval(this.myInterval)
            }
        }, 1000)
    }

    displayTimer() {
        var s = this.state.seconds % 60
        var m = Math.floor(this.state.seconds / 60)
        return `${m < 10 ? `0${m}`: m}:${s < 10 ? `0${s}`: s}`
    }
    componentDidMount() {
        let examInfo = JSON.parse(this.props.examInfo)
        let seconds = parseInt(examInfo[0].ThoiGian) * 60
        
        this.setState({
            seconds: seconds
        })
    }

    render() {
        const {
            status,
            mark
        } = this.props

        const {
            open,
            duration
        } = this.state

        return (
            <div className="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <center>
                            <b><p>{this.displayTimer()}</p></b>
                            <button className="btn btn-sm btn-success"
                                    onClick={this.command}
                            >
                                {status === 0 ? "Bắt đầu" : status === 1 ? "Hoàn thành" : "Xem kết quả"}
                            </button>
                        </center>
                    </div>
                </div>

                <Modal open={open} onClose={this.onCloseModal} center>
                    <div>
                        <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalLabel">
                                {status === 0 ? "Bạn đã sẵn sàng làm bài?" : status === 1 ? "Xác nhận nộp bài?" : "Kết quả"}
                            </h3>
                        </div>
                        {
                            status < 2 ? null : 
                            <div class="modal-body">
                                <p>Bạn làm đúng:<b>{mark}</b> câu. </p>
                                <p>Số điểm đạt được: <b>{mark * 100}</b></p>
                                <p>Thời gian hoàn thành: <b>{duration}</b></p>
                                <p>Bạn có thể đóng hộp thoại này để kiểm tra kết quả chi tiết từng câu.</p>
                            </div>
                        }
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={this.onCloseModal}>Đóng</button>
                            {
                                status < 2 ? 
                                <button type="button" class="btn btn-info" onClick={this.onConfirm}>Xác nhận</button> : null
                            }
                        </div>
                    </div>
                    
                </Modal>
            </div>
        )
    }

}