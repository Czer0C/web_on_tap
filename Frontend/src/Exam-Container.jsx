import React, { Component } from 'react';
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
            isRunning: true,
            open: false,
            mark: 0,
            duration: 0
        }

        this.handleCheckAnswer = this.handleCheckAnswer.bind(this);
        this.moveBack = this.moveBack.bind(this);
        this.moveNext = this.moveNext.bind(this);
        this.finish = this.finish.bind(this);
    }
    onOpenModal = () => {
        this.setState({ open: true });
      };
     
    onCloseModal = () => {
    this.setState({ open: false });
    };
    getData() {
        
    }
    componentDidMount() {
        this.initData()

        this.getData()

        this.myInterval = setInterval(() => {
            let s = this.state.seconds
            if (s > 0) {
                this.setState({
                    seconds: s - 1
                })
            }
            else {
                this.setState({
                    isRunning: false,
                    open: true
                })
            }
            if (!this.state.isRunning) {
                clearInterval(this.myInterval)
            }
        }, 1000)
    }

    displayTimer() {
        var s = this.state.seconds % 60
        var m = Math.floor(this.state.seconds / 60)
        return `${m < 10 ? `0${m}`: m}:${s < 10 ? `0${s}`: s}`
    }

    initData() {
        var temp = {
            "exam": "KIỂM TRA CHẤT LƯỢNG HỌC KÌ I",
            "semester": "Đọc hiểu Lớp 5 - NH: 2010-2011",
            "time" : "10",
            "title": "Trò chơi đom đóm",
            "paragraph" : "Thuở bé, chúng tôi thú nhất là trò bắt đom đóm! Lũ trẻ chúng tôi cứ chờ trời sẩm tối là dùng vợt làm bằng vải màn, ra bờ ao đón đường bay của lũ đom đóm vợt lấy vợt để; “ chiến tích” sau mỗi lần vợt là hàng chục con đom đóm lớn nhỏ, mỗi buổi tối như thế có thể bắt hàng trăm con.Việc bắt đom đóm hoàn tất, trò chơi mới bắt đầu; bọn trẻ nít nhà quê đâu có thú gì khác hơn là thú chơi giản dị như thế!\nĐầu tiên, chúng tôi bắt đom đóm cho vào trong chai, đeo lủng lẳng vào cửa lớp khi học tối. Bọn con gái bị đẩy đi trước nhìn thấy quầng sáng nhấp nháy tưởng có ma, kêu ré lên, chạy thục mạng.Làm đèn chơi chán chê, chúng tôi lại bỏ đom đóm vào vỏ trứng gà. Nhưng trò này kì công hơn: phải lấy vỏ lụa bên trong quả trứng làm thành cái túi, cho đom đóm vào trong mới phát sáng được. Chúng tôi đem cái túi ấy “ thả” vào vườn nhãn của các cụ phụ lão, cái túi bằng vỏ trứng kia cứ theo gió mà bay chập chờn chẳng khác gì ma trơi khiến mấy tên trộm nhát gan chạy thục mạng.\nTuổi thơ đi qua, những trò nghịch ngợm cũng qua đi... Tôi vào bộ đội, ra canh giữ Trường Sa thân yêu, một lần nghe bài hát “ Đom đóm”, lòng trào lên nỗi nhớ nhà da diết, cứ ao ước được trở lại tuổi ấu thơ...",
                "author": "Nguyễn Duy Dương",
                "note": "Ma trơi: đốm sáng thường thấy lập lòe ban đêm trên bãi tha ma.",
            "questions": [
            {
                "id": 1,
                "content": "Bài văn kể về chuyện gì?",
                "choices": ["A.	Làm các trò chơi nghịch ngợm.","B.	Làm đèn đi chơi.","C. Làm đèn đi tới lớp học ban đêm. "],
                "answer": "3"
            },
            {
                "id": 2,
                "content": "Vì sao những tên trộm nhát gan chạy thục mạng?",
                "choices": ["A.	Chúng bị các cụ phụ lão canh vườn nhãn rượt đuổi.", "B.	Chúng bị những đốm sáng ma trơi đuổi theo.", "C.	Chúng tưởng đèn đom đóm là ma trơi."],
                "answer": "1"
    
            },
            {
                "id": 3,
                "content": "Điều gì khiến anh bộ đội nhớ nhà, nhớ tuổi thơ da diết?",
                "choices": ["A.	Anh  nghe đài hát bài “ Đom đóm” rất hay.","B.	Anh đang canh giữ Trường Sa và được nghe hát bài “ Đom đóm”.","C. Anh cùng đồng đội ở đảo Trường Sa tập hát bài “ Đom đóm”"],
                "answer": "3"
    
            },
            {
                "id": 4,
                "content": "Tác giả có tình cảm như thế nào với trò chơi đom đóm?",
                "choices": ["A.	Rất nhớ.","B.	Rất yêu thích.","C. Cả 2 ý trên đều đúng."],
                "answer": "2"
    
            },
            {
                "id": 5,
                "content": "Bài văn kể về chuyện gì?",
                "choices": ["A. Dùng đom đóm làm đèn.","B. Giúp các cụ phụ lão canh vườn nhãn.","C.	Trò chơi đom đóm của tuổi nhỏ ở miền quê."],
                "answer": "3"
    
            },
            {
                "id": 6,
                "content": "Từ nào sau đây trái nghĩa với từ “ nhát gan” ?",
                "choices": ["A.	Hèn nhát","B.	Dũng cảm","C.	Hồn nhiên"],
                "answer": "2"
    
            },
            {
                "id": 7,
                "content": "Từ \"vợt\" trong cụm từ \"dùng vợt làm bằng vải màn\" và từ \"vợt\" trong cụm từ \"vợt lấy vợt\" để có quan hệ vói nhau như thế nào ?",
                "choices": ["A.	Là 1 từ nhiều nghĩa.","B.	Là 2 từ đồng nghĩa.","C.	Là 2 từ đồng âm."],
                "answer": "2"
    
            },
            {
                "id": 8,
                "content": "Trong câu: “Mặc dù tuổi thơ đã qua nhưng trò chơi đom đóm vẫn luôn hiện về trong tôi.” có cặp từ chỉ quan hệ nào?",
                "choices": ["A. Quan hệ tương phản.","B. Quan hệ nguyên nhân- kết quả.","C. Quan hệ giả thiết- kết quả."],
                "answer": "3"
    
            },
            {
                "id": 9,
                "content": "Trong câu chuyện trên có những loại câu nào?",
                "choices": ["A.	Chỉ có câu kể, câu hỏi.","B . Chỉ có câu kể, câu cảm.","C . Có câu kể, câu cảm và câu khiến."],
                "answer": "1"
    
            },
            {
                "id": 10,
                "content": "Vị ngữ  trong câu “Lòng trào lên nỗi nhớ nhà da diết, cứ ao ước được trở lại tuổi ấu thơ.”là những từ ngữ nào? ",
                "choices": ["A.	trào lên nỗi nhớ nhà da diết.","B.	cứ ao ước được trở lại tuổi ấu thơ.","C.	trào lên nỗi nhớ nhà da diết, cứ ao ước được trở lại tuổi ấu thơ."],
                "answer": "3"
    
            }]
    
        }
        

        var initAns = []
        for (var i = 0; i < temp.questions.length; i++) {
            initAns.push({ id: temp.questions[i].id, picked: -1})
        }
    
        this.setState({
            seconds: temp.time * 60,
            answer: initAns,
            data: temp,
            size: temp.questions.length
        }, this.splitPara)
        
         
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
        for (var i = 0; i < q.length; i++) {
            sum += parseInt(q[i].answer) - 1 === parseInt(ans[i].picked) ? 1 : 0
        }
        this.setState({
            mark: sum
        })
    }
    getDuration() {
        var result = this.state.data.time * 60 - this.state.seconds
        console.log(result)
        this.setState({
            duration: `${Math.floor(result / 60)}:${result % 60}`
        })
    }
    finish = () => {
        this.onOpenModal();
        if (!this.state.isRunning) {
            return;
        }
        this.getData();
        this.getMark();
        this.getDuration();
        var duration = this.state.seconds;
        console.log(this.state.answer)
        this.setState({isRunning:false})
    }

    splitPara() {
        var s = this.state.data.paragraph.split("\n")
        return s;
    }

    render() {
        const s1 = {
            "text-align": "justify"
        }
        const { 
            seconds, 
            data, 
            current, 
            isRunning, 
            answer, 
            open, 
            duration, 
            mark } = this.state

        if (!data.questions) {
            return <span>Loading...</span>;
        }
        
        return (
            <div className="product-page">
                <div className="section section-gray">
                    <div className="container">
                    <div class="main main-raised main-product">
                        {/* <div className="pull-right">
                            TIMER PLACEMENT 01
                            </div> */}
                        <div className="row">
                            <div className="col">
                                <center>
                                    <div class="card">
                                        <div class="card-body">
                                            <h2 class="card-title">{data.exam}</h2>
                                            <h4 class="card-subtitle mb-2 text-muted">{data.semester}</h4>
                                            <h4><i>Dựa vào nội dung bài đọc, khoanh vào chữ cái trước câu trả lời đúng nhất</i></h4>
                                        </div>
                                    </div>
                                </center>
                            </div>
                        </div>
                        
                        <div class="row" style={s1}>
                        <div class="col-md-6 col-sm-6">
                            <div class="card card-nav-tabs" >
                                <div class="card-header card-header-info">
                                    <center><h4>{data.title}</h4> </center> 
                                </div>
                                <div className="card-body">                           
                                    {
                                        this.splitPara().map((item, index) => (
                                            <p key={index}>{item}</p>   
                                        ))
                                    }
                                    <p><center><b>Theo {data.author}</b></center></p>
                                    <p>{data.note}</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-6">
                            <div class="card card-nav-tabs">
                                <div class="card-header card-header-primary">
                                    <h4>Câu {data.questions[current].id}: {data.questions[current].content}</h4>
                                </div>
                                <div class="card-body">
                            {
                                data.questions[current].choices.map((item, index) => (
                                    <div class="form-check form-check-radio" key={index}>
                                    <label class={isRunning ? "form-check-label" : data.questions[current].answer - 1 === index ? "form-check-label bg-warning" : "form-check-label"}>
                                        <input  class="form-check-input" 
                                                type="radio" 
                                                name="exampleRadios" 
                                                id={`radio_${index}`} 
                                                value={index} 
                                                disabled={!isRunning}
                                                onChange={this.handleCheckAnswer}
                                                checked={isRunning ? null : parseInt(answer[current].picked) === index ? true : false}
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
                                    >
                                        <i class="material-icons">arrow_back</i>&nbsp;Quay lại
                                    </button> 
                                    <button className="btn btn-sm btn-warning" 
                                            onClick={this.moveNext}
                                    >
                                        Tiếp tục&nbsp;<i class="material-icons">arrow_forward</i>
                                    </button>
                                </center> 
                            </div>
                            </div>
                            {
                            <div className="col-md-6 pull-right">
                                <div class="card">
                                    <div class="card-body">
                                        <center>
                                            <b><p>{this.displayTimer()}</p></b>
                                            <button className="btn btn-sm btn-success"
                                                    onClick={this.finish}
                                            >
                                                {isRunning ? "Hoàn thành" : "Xem kết quả"}
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
                    <div class="modal-header">
                        <h3 class="modal-title" id="exampleModalLabel">Kết quả</h3>
                    </div>
                    <div class="modal-body">
                        <p>{`Bạn được `}<b>{mark}</b> điểm. </p>
                        <p>Thời gian hoàn thành: <b>{duration}</b></p>
                        <p>Bạn có thể đóng hộp thoại này để kiểm tra kết quả chi tiết từng câu.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onClick={this.onCloseModal}>Đóng</button>
                    </div>
                </Modal>
                    </div>
                </div>
            </div>    
        )
    }
    
}