import React, { Component } from 'react';
import {Line} from 'rc-progress';
import {splitParagraph} from './Exam';

export default class ExamQA extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            answer: []
        }
        this.moveBack = this.moveBack.bind(this)
        this.moveNext = this.moveNext.bind(this)
        this.handleCheckAnswer = this.handleCheckAnswer.bind(this)
        this.handleOnChangeInputType2 = this.handleOnChangeInputType2.bind(this)
        this.handleOnChangeInputType3_1 = this.handleOnChangeInputType3_1.bind(this)
        this.handleOnChangeInputType3_2 = this.handleOnChangeInputType3_2.bind(this)
    }

    handleCheckAnswer(event) {
        let temp = this.state.answer
        temp[this.state.current].content = event.target.value
        this.setState({
            answer: temp
        })
        this.props.onChangeChoices(temp)
    }
    handleOnChangeInputType2(event) {
        let temp = this.state.answer
        temp[this.state.current].content = event.target.value
        this.setState({
            answer: temp
        })
        this.props.onChangeChoices(temp)
    }
    handleOnChangeInputType3_1(event) {
        let temp = this.state.answer
        temp[this.state.current].content[0] = event.target.value
        this.setState({
            answer: temp
        })
        this.props.onChangeChoices(temp)
    }
    handleOnChangeInputType3_2(event) {
        let temp = this.state.answer
        temp[this.state.current].content[1] = event.target.value
        this.setState({
            answer: temp
        })
        this.props.onChangeChoices(temp)
    }
    moveNext() {
        var aa = document.getElementsByClassName("form-check-input");
        for (var i = 0; i < aa.length; i++) 
            aa[i].checked = false;

        var c = this.state.current;
        this.setState({
            current: c > this.state.size - 2 ? c : c + 1
        })
    }
    moveBack() {
        var aa = document.getElementsByClassName("form-check-input");
        for (var i = 0; i < aa.length; i++) 
            aa[i].checked = false;
            
        var c = this.state.current;
        this.setState({
            current: c < 1 ? c : c - 1
        })
    }

    processQA() {
        let questions = JSON.parse(this.props.questions)
        let choices = JSON.parse(this.props.choices)
        
        var initAns = []
        for (var i = 0; i < questions.length; i++) {
            let ans = {
                id: questions[i].SoThuTu
            }
            switch (questions[i].LoaiCauHoi) {
                case 1:
                    ans.content = -1
                    break;
                case 2:
                    ans.content = "dum"
                    break;
                case 3:
                    ans.content = ["dum1", "dum2"]
                    break;
            }

            initAns.push(ans)
            questions[i].choices = []
        }
        for (var i = 0; i < choices.length; i++) {            
            questions[choices[i].STTCauHoi].choices.push(choices[i].NoiDung)
        }
        
        this.setState({
            questions: questions,
            choices: choices,
            size: questions.length,
            answer: initAns
        })
    }

    componentDidMount() {
        this.processQA()
    }


    render() {
        const {
            status
        } = this.props

        const {
            current,
            questions,
            answer,
            size
        } = this.state
        console.log(questions)
        return (        
            <div>
                            {
                                status === 0 ? null : 
                                <div class="card card-nav-tabs">
                                <div class="card-header card-header-primary" hidden={!questions[current].NoiDung}>
                                    <h4>Câu {questions[current].SoThuTu + 1}: {questions[current].NoiDung}</h4>
                                    <Line percent={(current + 1) * 10} strokeWidth="1.5"  strokeColor="#47a44b"  />
                                </div>
                                
                                <div class="card-body">
                            {
                                questions[current].LoaiCauHoi === 1 || questions[current].LoaiCauHoi === null ?
                                questions[current].choices.map((item, index) => (
                                    
                                    <div class="form-check form-check-radio" hidden={!item} key={index}>
                                    <label 
                                        class={
                                            status !== 2 ? "form-check-label" : 
                                            parseInt(questions[current].CauTraLoi) === index ? 
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
                                                checked={0 > status ? null : parseInt(answer[current].content) === index ? true : false}
                                        />
                                        {splitParagraph(item).map((item, index) => (
                                            <p>{item}</p>
                                        ))}
                                        <span class="circle">
                                            <span class="check"></span>
                                        </span>
                                    </label>
                                    </div>
                                )) : 
                                questions[current].LoaiCauHoi === 2 ? 
                                <div class="form-group">
                                    <textarea   
                                        class="form-control" 
                                        id="exampleFormControlTextarea1" 
                                        rows="3"
                                        placeholder="Nhập câu trả lời..."
                                        value={answer[current].content}
                                        onChange={this.handleOnChangeInputType2}
                                        disabled={status !== 1}
                                    />
                                    <br/>
                                    <label className="bg-warning" hidden={status !== 2}>
                                        Câu trả lời đúng: <b>{questions[current].CauTraLoi}</b>
                                    </label>
                                </div> : 
                                <div className="col-sm-12">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <label class="form-control col-sm-4">
                                                Chủ Ngữ:
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder="Chủ Ngữ..." 
                                                class="form-control" 
                                                value={answer[current].content[0]}
                                                onChange={this.handleOnChangeInputType3_1}
                                                disabled={status !== 1}
                                            />
                                        </div>
                                        <label class="bg-warning" hidden={status !== 2}>
                                            Câu trả lời đúng: <b>{questions[current].CauTraLoi.split(";")[0]}</b>
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <label class="form-control col-sm-4">
                                                Vị Ngữ:
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder="Vị Ngữ..." 
                                                class="form-control" 
                                                value={answer[current].content[1]}
                                                onChange={this.handleOnChangeInputType3_2}
                                                disabled={status !== 1}
                                            />
                                        
                                        </div>
                                        <label class="bg-warning" hidden={status !== 2}>
                                            Câu trả lời đúng: <b>{questions[current].CauTraLoi.split(";")[1]}</b>
                                        </label>
                                    </div>
                                    
                                </div>
                            }
                                <hr/>
                                <center>    
                                    <button className="btn btn-sm btn-warning" 
                                            id="btn-move-back"
                                            onClick={this.moveBack}
                                            disabled={current === 0 ? true : null}
                                    >
                                        <i class="material-icons">arrow_back</i>&nbsp;Quay lại
                                    </button> 
                                    <button className="btn btn-sm btn-warning" 
                                            id="btn-move-next"
                                            onClick={this.moveNext}
                                            disabled={current === size - 1 ? true : questions[current + 1].NoiDung === '' ? true : null}
                                    >
                                        Tiếp tục&nbsp;<i class="material-icons">arrow_forward</i>
                                    </button>

                                    
                                </center> 
                            </div></div>
        
                    }</div>
    )
}}