import React, { Component } from 'react';
import Modal from 'react-responsive-modal'; 
import { Line } from 'rc-progress';

export default class ExamManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            examName: '',
            semester: 1,
            grade: 1,
            duration: 1,
            title: '',
            content: '',
            author: '',
            note: '',
            currentTab: 0,
            question: {
                ID: '',
                examID: '',
                content: ''
            },
            choiceA: {
                ID: '',
                examID: '',
                questionID: '',
                content: '',
                isCorrect: true
            },
            choiceB: {
                ID: '',
                examID: '',
                questionID: '',
                content: '',
                isCorrect: false
            },
            choiceC: {
                ID: '',
                examID: '',
                questionID: '',
                content: '',
                isCorrect: false
            },
            choiceD: {
                ID: '',
                examID: '',
                questionID: '',
                content: '',
                isCorrect: false
            },
            questionList: [],
            choiceList: [],
            filledCount: 0

        }
        this.handleChangeExamName = this.handleChangeExamName.bind(this);
        this.handleChangeSemester = this.handleChangeSemester.bind(this);
        this.handleChangeGrade = this.handleChangeGrade.bind(this);
        this.handleChangeDuration = this.handleChangeDuration.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
        this.handleChangeNote = this.handleChangeNote.bind(this);

        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
        this.handleChangeChoiceA = this.handleChangeChoiceA.bind(this);
        this.handleChangeChoiceB = this.handleChangeChoiceB.bind(this);
        this.handleChangeChoiceC = this.handleChangeChoiceC.bind(this);
        this.handleChangeChoiceD = this.handleChangeChoiceD.bind(this);
        this.handleCheckCorrect = this.handleCheckCorrect.bind(this);

        this.onConfirm = this.onConfirm.bind(this);
        this.onReturn = this.onReturn.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onAdd = this.onAdd.bind(this)
        
    }
    handleChangeExamName(event) {this.setState({examName:event.target.value})}
    handleChangeSemester(event) {this.setState({semester:event.target.value})}
    handleChangeGrade(event) {this.setState({grade:event.target.value})}
    handleChangeDuration(event) {this.setState({duration:event.target.value})}
    handleChangeTitle(event) {this.setState({title:event.target.value})}
    handleChangeContent(event) {this.setState({content:event.target.value})}
    handleChangeAuthor(event) {this.setState({author:event.target.value})}
    handleChangeNote(event) {this.setState({note:event.target.value})}
    
    handleChangeQuestion(event) {
        let q = this.state.question
        q.content = event.target.value
        this.setState({question: q})}

    handleChangeChoiceA(event) {
        var temp = this.state.choiceA
        temp.content = event.target.value
        this.setState({choiceA: temp})
    }
    handleChangeChoiceB(event) {
        var temp = this.state.choiceB
        temp.content = event.target.value
        this.setState({choiceB: temp})
    }
    handleChangeChoiceC(event) {
        var temp = this.state.choiceC
        temp.content = event.target.value
        this.setState({choiceC: temp})
    }
    handleChangeChoiceD(event) {
        var temp = this.state.choiceD
        temp.content = event.target.value
        this.setState({choiceD: temp})
    }

    handleCheckCorrect(event) {
        let radioPick = parseInt(event.target.value)
        let temp = this.state.choiceA
        temp.isCorrect = radioPick === 1
        this.setState({
            choiceA: temp
        })
        temp = this.state.choiceB
        temp.isCorrect = radioPick === 2
        this.setState({
            choiceB: temp
        })
        temp = this.state.choiceC
        temp.isCorrect = radioPick === 3
        this.setState({
            choiceC: temp
        })
        temp = this.state.choiceD
        temp.isCorrect = radioPick === 4
        this.setState({
            choiceD: temp
        })
    }
    validate() {
        if (this.state.examName === "" || 
            this.state.semester === "" || 
            this.state.grade === "" || 
            this.state.duration === "" || 
            this.state.title === "" || 
            this.state.content === "" ||
            this.state.author === "" ||
            this.state.note === "" || 
            this.state.filledCount !== 10) {
            return false;
        }
        return true;
    }

    onOpenModal = () => {
        this.setState({ open: true });
      };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };

    onConfirm() {
        var item = {
            examName : this.state.examName,
            semester : this.state.semester,
            grade : this.state.grade,
            duration : this.state.duration,
            title : this.state.title,
            content : this.state.content,
            author : this.state.author,
            note : this.state.note,
            questionList: this.state.questionList,
            choiceList: this.state.choiceList
        }

        console.log(item)
        fetch(`http://localhost:9000/baikiemtra/them`, {
            method: `post`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer 669`
            },
            body: JSON.stringify(item)
          })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) 
                    alert("Thành công")
                else
                    alert("Xảy ra lỗi. Hãy thử lại.")
            })

        this.onCloseModal()

    }


    onAdd() {
        var c = this.state.currentTab
        var ql = this.state.questionList
        var cl = this.state.choiceList
        var q = this.state.question
    
        cl[c * 4].content = this.state.choiceA.content
        cl[c * 4].isCorrect = this.state.choiceA.isCorrect
        cl[c * 4 + 1].content = this.state.choiceB.content
        cl[c * 4 + 1].isCorrect = this.state.choiceB.isCorrect
        cl[c * 4 + 2].content = this.state.choiceC.content
        cl[c * 4 + 2].isCorrect = this.state.choiceC.isCorrect
        cl[c * 4 + 3].content = this.state.choiceD.content
        cl[c * 4 + 3].isCorrect = this.state.choiceD.isCorrect

        ql[c].content = q.content
        
        this.setState({
            questionList: ql,
            choiceList: cl
        })
    }

    
    componentDidMount() {
        this.initData()
    }
    
    initData() {
        var ql = []
        var cl = []
        for (var i = 0; i < 10; i++) {
            ql.push({
                ID: i,
                examID: '',
                content: ''
            })
            for (var j = 0; j < 4; j++) {
                cl.push({
                    ID: j,
                    examID: '',
                    questionID: i,
                    content: '',
                    isCorrect: false
                })
            }
        }   
        this.setState({
            questionList: ql,
            choiceList: cl
        })
    }

    onReturn() {
        var c = this.state.currentTab;
        var cl = this.state.choiceList
        c = c < 1 ? c : c - 1
        this.setState({
            currentTab: c,
            question: this.state.questionList[c],
            choiceA: cl[c * 4],
            choiceB: cl[c * 4 + 1],
            choiceC: cl[c * 4 + 2],
            choiceD: cl[c * 4 + 3]
        })
    }

    onNext() {
        var c = this.state.currentTab
        var cl = this.state.choiceList
        c = c > 8 ? c : c + 1

        this.setState({
            currentTab: c,
            question: this.state.questionList[c],
            choiceA: cl[c * 4],
            choiceB: cl[c * 4 + 1],
            choiceC: cl[c * 4 + 2],
            choiceD: cl[c * 4 + 3]
        })
    }

    render() {
        const {
            open,
            currentTab,
            question,
            choiceA,
            choiceB,
            choiceC,
            choiceD
        } = this.state

        return (
            <div className="product-page">
                <div className="section section-gray">
                    <div className="container">
                        <div class="main main-raised main-product">
                        <center>
                            <h2>Thêm Bài Kiểm Tra</h2>
                        </center>
                        <div className="row">
                                <div className="card">
                                    <div className="card-body">
                                       <center> <h3>Thông Tin Tổng Quát</h3></center>
                                    <form>
                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Tên Bài Kiểm Tra</label>
                                            <input  type="text" 
                                                    class="form-control" 
                                                    id="exampleFormControlInput1" 
                                                    placeholder=""
                                                    value={this.state.examName} 
                                                    onChange={this.handleChangeExamName}
                                            />
                                        </div>


                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Học Kỳ</label>
                                            <select class="form-control" 
                                                    id="exampleFormControlSelect1" 
                                                    value={this.state.semester} 
                                                    onChange={this.handleChangeSemester}
                                            >
                                                <option value="1">Giữa Học Kỳ I</option>
                                                <option value="2">Cuối Học Kỳ I</option>
                                                <option value="3">Giữa Học Kỳ II</option>
                                                <option value="4">Cuối Học Kỳ II</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Lớp</label>
                                            <select class="form-control" 
                                                    id="exampleFormControlSelect1"
                                                    value={this.state.grade} 
                                                    onChange={this.handleChangeGrade}
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Thời gian</label>
                                            <input  type="number" 
                                                    class="form-control" 
                                                    id="exampleFormControlInput1" 
                                                    placeholder=""
                                                    value={this.state.duration} 
                                                    onChange={this.handleChangeDuration}
                                            />
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Tựa Đề</label>
                                            <input  type="text" 
                                                    class="form-control" 
                                                    id="exampleFormControlInput1" 
                                                    placeholder=""
                                                    value={this.state.title} 
                                                    onChange={this.handleChangeTitle}
                                            />
                                                    
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Nội Dung Bài Đọc</label>
                                            <textarea   class="form-control" 
                                                        id="exampleFormControlTextarea1" 
                                                        rows="3"
                                                        value={this.state.content} 
                                                        onChange={this.handleChangeContent}
                                            />
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Tên Tác Giả</label>
                                            <input  type="text" 
                                                    class="form-control" 
                                                    id="exampleFormControlInput1" 
                                                    placeholder=""
                                                    value={this.state.author} 
                                                    onChange={this.handleChangeAuthor}
                                            />
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Ghi chú</label>
                                            <textarea   class="form-control"
                                                        id="exampleFormControlTextarea1" 
                                                        rows="3"
                                                        value={this.state.note} 
                                                        onChange={this.handleChangeNote}
                                            />
                                        </div>
                                    </form>
                                    </div>
                                </div>
                            
                                <div className="card">
                                    <div className="card-body">
                                       <center> <h3>Các Câu Hỏi Và Lựa Chọn</h3></center>
                                       <Line percent={(currentTab + 1) * 10} strokeWidth="1.5"  strokeColor="#47a44b"  />
                                       
                                    <form>
                                    <br/>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Câu hỏi {currentTab + 1}</label>
                                            <input  
                                                type="text" 
                                                class="form-control" 
                                                placeholder="Nội dung"
                                                value={question.content}
                                                onChange={this.handleChangeQuestion}
                                            />
                                            
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Lựa chọn A</label>
                                                    <input 
                                                        type="text" 
                                                        class="form-control" 
                                                        placeholder="Nội dung"
                                                        value={choiceA.content}
                                                        onChange={this.handleChangeChoiceA}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col">
                                                <br/>
                                            <div class="form-group">
                                                <div class="form-check form-check-radio">
                                                    <label class="form-check-label">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="radio" 
                                                            value="1"
                                                            name="exampleRadios"
                                                            checked={choiceA.isCorrect ? true : false}
                                                            onChange={this.handleCheckCorrect} 
                                                        />
                                                        Là câu đúng
                                                        <span class="circle">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Lựa chọn B</label>
                                                    <input 
                                                        type="text" 
                                                        class="form-control" 
                                                        placeholder="Nội dung"
                                                        value={choiceB.content}
                                                        onChange={this.handleChangeChoiceB}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col">
                                                <br/>
                                            <div class="form-group">
                                                <div class="form-check form-check-radio">
                                                    <label class="form-check-label">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="radio" 
                                                            value="2"
                                                            name="exampleRadios"
                                                            checked={choiceB.isCorrect ? true : false}
                                                            onChange={this.handleCheckCorrect} 
                                                        />
                                                        Là câu đúng
                                                        <span class="circle">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Lựa chọn C</label>
                                                    <input 
                                                        type="text" 
                                                        class="form-control" 
                                                        placeholder="Nội dung"
                                                        value={choiceC.content}
                                                        onChange={this.handleChangeChoiceC}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col">
                                                <br/>
                                            <div class="form-group">
                                                <div class="form-check form-check-radio">
                                                    <label class="form-check-label">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="radio" 
                                                            value="3"
                                                            name="exampleRadios"
                                                            checked={choiceC.isCorrect ? true : false}
                                                            onChange={this.handleCheckCorrect} 
                                                        />
                                                        Là câu đúng
                                                        <span class="circle">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Lựa chọn D</label>
                                                    <input 
                                                        type="text" 
                                                        class="form-control" 
                                                        placeholder="Nội dung"
                                                        value={choiceD.content}
                                                        onChange={this.handleChangeChoiceD}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col">
                                                <br/>
                                            <div class="form-group">
                                                <div class="form-check form-check-radio">
                                                    <label class="form-check-label">
                                                        <input 
                                                            class="form-check-input" 
                                                            type="radio" 
                                                            value="4"
                                                            name="exampleRadios"
                                                            checked={choiceD.isCorrect ? true : false}
                                                            onChange={this.handleCheckCorrect} 
                                                        />
                                                        Là câu đúng
                                                        <span class="circle">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            </div>
                                        </div>
                                            
                                        
                                    </form>
                                    
                                    
                                    <center>
                                        <button className="btn btn-warning" 
                                                onClick={this.onReturn}
                                        >
                                            Quay lại
                                        </button>
                                        <button className="btn btn-success" 
                                                onClick={this.onAdd}
                                        >
                                            Thêm
                                        </button>
                                        <button className="btn btn-warning" 
                                                onClick={this.onNext}
                                        >
                                            Tiếp tục
                                        </button>
                                    </center>
                                    </div>
                                </div>
                        </div>
                        <center>
                                        <button className="btn btn-info" 
                                                disabled={this.validate() === true ? "" : ""}
                                                onClick={this.onOpenModal}
                                        >
                                            Hoàn tất
                                        </button>
                                    </center>
                                <Modal open={open} onClose={this.onCloseModal} center>
                                    <h4 class="modal-title" id="exampleModalLabel">Xác Nhận Tạo</h4>
                                    <br/><br/>

                                    <button type="button" class="btn btn-warning" onClick={this.onCloseModal}>Đóng</button>
                                    <button type="button" class="btn btn-primary" onClick={this.onConfirm}>Xác Nhận</button>
                                </Modal>
                            </div>
                        </div>
                    </div>
               
            </div>

        )
    }
}