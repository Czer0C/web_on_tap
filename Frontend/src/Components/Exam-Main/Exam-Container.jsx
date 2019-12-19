import React, { Component } from 'react';
import {Line} from 'rc-progress';
import Modal from 'react-responsive-modal'; 

export default class ExamContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            minutes: 0,
            data: {},
            current: 0,
            size: 0,
            answer: [],
            picked: null,
            status: 0, // 0: chưa bắt đầu | 1: đang chạy | 2: kết thúc
            open: false,
            mark: 0,
            duration: 0,
            examID: -1,
            userID: this.props.userID,
            sectionID: -1
        }

        this.handleCheckAnswer = this.handleCheckAnswer.bind(this);
        this.moveBack = this.moveBack.bind(this);
        this.moveNext = this.moveNext.bind(this);
        this.command = this.command.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }
    onOpenModal = () => {
        this.setState({ open: true });
      };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };

    getExam() {
        let query = window.location.href.split("/")
        let param = query[query.length - 1]
        fetch("http://localhost:9000/users/thongtinbaikiemtra/" + param)
        .then(res => res.text())
        .then(res => {
            let response = JSON.parse(res)
            let question = JSON.parse(response.questionInfo)
            let choice = JSON.parse(response.choiceInfo)

            var initAns = []
            for (var i = 0; i < question.length; i++) {
                initAns.push({ id: question[i].SoThuTu, picked: -1})
                question[i].choices = []
            }

            for (var i = 0; i < choice.length; i++) {
                
                if (choice[i].Dung === 1) {
                    question[choice[i].STTCauHoi].CauTraLoiDung = choice[i].SoThuTu
                }
                question[choice[i].STTCauHoi].choices.push(choice[i].NoiDung)
            }

            let tempData = JSON.parse(response.examInfo)[0]
            tempData.questions = question

            this.setState({
                examID: param,
                size: question.length,
                data: tempData,
                seconds: tempData.ThoiGian * 60,
                answer: initAns

            })
        }); 
    }

    submitEntry() {
        fetch("http://localhost:9000/users/batdaulambai", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userID: this.state.userID,
                examID: this.state.examID,
                startTime: (new Date()).getTime()
            })
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                this.setState({
                    sectionID: json.sectionID
                })
            }
            else {
                alert("Không thể ghi nhận phiên làm bài, hãy thử lại sau.")
            }
        });
    }

    finishExam(mark) {
        fetch("http://localhost:9000/users/nopbai", {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userID: this.state.userID,
                examID: this.state.examID,
                sectionID: this.state.sectionID,
                mark: mark,
                endTime: (new Date()).getTime()
            })
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
            }
            else {
                alert('Xảy ra lỗi');
            }
        });
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
                let mark = this.getMark()
                this.finishExam(mark)
                this.getDuration()
                this.setState({
                    status: 2,
                    open: true
                })
            }
            if (this.state.status === 2) { // Nộp bài sớm
                clearInterval(this.myInterval)
            }
        }, 1000)
    }

    componentDidMount() {
        this.getExam()
    }

    displayTimer() {
        var s = this.state.seconds % 60
        var m = Math.floor(this.state.seconds / 60)
        return `${m < 10 ? `0${m}`: m}:${s < 10 ? `0${s}`: s}`
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
    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
    handleCheckAnswer(e) {
        let temp = this.state.answer
        temp[this.state.current].picked = e.target.value
        this.setState({
            answer: temp
        })

    }
    moveNext() {
        var aa =  document.getElementsByClassName("form-check-input");
        for (var i = 0; i < aa.length; i++) 
            aa[i].checked = false;


        var c = this.state.current;
        this.setState({
            current: c > this.state.size - 2 ? c : c + 1
        })
    }
    moveBack() {
        var aa =  document.getElementsByClassName("form-check-input");
        for (var i = 0; i < aa.length; i++) 
            aa[i].checked = false;
        var c = this.state.current;
        this.setState({
            current: c < 1 ? c : c - 1
        })
    }

    getMark() {
        var ans = this.state.answer
        var q = this.state.data.questions
        var sum = 0
        for (var i = 0; i < q.length; i++) 
            sum += parseInt(q[i].CauTraLoiDung) === parseInt(ans[i].picked) ? 1 : 0
        this.setState({
            mark: sum
        })
        return sum
    }

    getDuration() {
        var result = this.state.data.ThoiGian * 60 - this.state.seconds
        this.setState({
            duration: `${Math.floor(result / 60)}:${result % 60}`
        })
    }

    onConfirm() {
        if (this.state.status === 0) { // Bắt đầu làm bài
            this.getExam()
            this.submitEntry()
            this.startTime();
            this.setState({
                status: 1,
                open: false
            })
        }
        else { // Kết thúc
            let mark = this.getMark()
            this.finishExam(mark)
            this.getDuration()
            this.setState({
                status: 2
            })
        }
    }

    command = () => {
        this.onOpenModal(); 
    }
    
    splitPara(content) {
        if (typeof(content) === undefined) return
        
        var s = content.split("\n")
        return s;
    }

    render() {
        const s1 = {
            "textAlign": "justify"
        }
        const {
            data, 
            current, 
            status, 
            answer, 
            open, 
            duration, 
            mark } = this.state

        if (!data.NoiDungBaiDoc) {
            return <img id="loading" src="https://i.imgur.com/FMpRIoS.gif"></img>   ;
        }
        
        return (
            <div className="product-page">
                <div className="section section-gray">
                    <div className="container">
                    <div class="main main-raised main-product">
                        <div className="row">
                            <div className="col">
                                <center>
                                    <div class="card">
                                        <div class="card-body">
                                            <h2 class="card-title">{data.TenBaiKiemTra}</h2>
                                            <h4 class="card-subtitle mb-2 text-muted">Lớp {data.Lop} - {this.renderSemester(data.MaHocKy)}</h4>
                                            <h4><i>Dựa vào nội dung bài đọc, khoanh vào chữ cái trước câu trả lời đúng nhất</i></h4>
                                            <h4><i>Nhấp vào nút "Bắt đầu" để hiển thị thông tin và làm bài.</i></h4>
                                        </div>
                                    </div>
                                </center>
                            </div>
                        </div>
                        
                        <div class="row" style={s1}>
                        <div class="col-md-6 col-sm-6">
                            <div class="card card-nav-tabs" >
                                <div class="card-header card-header-info">
                                    <center><h4>{data.TuaDe}</h4> </center> 
                                </div>
                                {
                                    status === 0 ? null :
                                    <div className="card-body">                           
                                    {
                                        this.splitPara(data.NoiDungBaiDoc).map((item, index) => (
                                            <p key={index}>{item}</p>   
                                        ))
                                    }
                                    <center><p><b>Theo {data.TenTacGia}</b></p></center>
                                    <p>{data.GhiChu}</p>
                                </div>
                                }
                                
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-6">
                            {
                                status === 0 ? null : <div class="card card-nav-tabs">
                                <div class="card-header card-header-primary">
                                    <h4>Câu {data.questions[current].SoThuTu + 1}: {data.questions[current].NoiDung}</h4>
                                    <Line percent={(current + 1) * 10} strokeWidth="1.5"  strokeColor="#47a44b"  />
                                </div>
                                
                                <div class="card-body">
                            {
                                data.questions[current].choices.map((item, index) => (
                                    <div class="form-check form-check-radio" key={index}>
                                    <label 
                                        class={
                                            status !== 2 ? "form-check-label" : 
                                            data.questions[current].CauTraLoiDung === index ? 
                                            "form-check-label bg-warning" : 
                                            "form-check-label"
                                        }
                                    >
                                        <input  class="form-check-input" 
                                                type="radio" 
                                                name="exampleRadios" 
                                                id={`radio_${index}`} 
                                                value={index} 
                                                disabled={status !== 1}
                                                onChange={this.handleCheckAnswer}
                                                checked={0 > status ? null : parseInt(answer[current].picked) === index ? true : false}
                                        />
                                        {item}
                                        <span class="circle">
                                            <span class="check"></span>
                                        </span>
                                    </label>
                                    </div>
                                ))
                            }
                                <hr/>
                                <center>    
                                    <button className="btn btn-sm btn-warning" 
                                            onClick={this.moveBack}
                                            disabled={current === 0 ? true : null}
                                    >
                                        <i class="material-icons">arrow_back</i>&nbsp;Quay lại
                                    </button> 
                                    <button className="btn btn-sm btn-warning" 
                                            onClick={this.moveNext}
                                            disabled={current === 9 ? true : null}
                                    >
                                        Tiếp tục&nbsp;<i class="material-icons">arrow_forward</i>
                                    </button>

                                    
                                </center> 
                            </div>
                            </div>
                            }
                            {
                                <div className="col-md-6 pull-right">
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
                                </div>
                            }
                        </div>
                    
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
                                    <p>{`Bạn được `}<b>{mark}</b> điểm. </p>
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
                </div>
            </div>    
        )
    }
    
}