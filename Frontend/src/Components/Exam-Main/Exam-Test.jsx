import React, { Component } from 'react';
import ExamHeader from './Exam Components/Exam-Header';
import ExamContent from './Exam Components/Exam-Content';
import ExamQA from './Exam Components/Exam-QA';
import ExamCommand from './Exam Components/Exam-Command';

export default class ExamTest extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            status: 0,
            choices: []
        }
        this.handleChoicesChange = this.handleChoicesChange.bind(this)
        this.handleCommandChange = this.handleCommandChange.bind(this)
        this.handleChangeDuration = this.handleChangeDuration.bind(this)

    }

    handleChoicesChange(choices) {
        this.setState({
            choices: choices
        })
    }
    handleCommandChange(status) {
        if (status === 1) {
            this.beginExam()
            this.setState({
                status: status
            })
        }
        
        else if (status === 2) {
            this.submitAnswer(status)
        }
        else {
            this.setState({
                status: status
            })
        }
    }
    submitAnswer(status) {
        fetch("http://localhost:9000/phienlambai/ketthuc", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer 669`
            },
            body: JSON.stringify({
                userID: this.props.userID,
                examID: this.state.examID,
                choices: this.state.choices,
                sectionID: this.state.sectionID,
                endTime: (new Date()).getTime()
            })
        })
        .then(res => res.json())
        .then(res => {       
            console.log(res) 
            
            if (res.success) {
                this.setState({
                    mark: res.mark,
                    status: status
                })
            }
            else {

            }
        })   
    }
    beginExam() {
        fetch("http://localhost:9000/phienlambai/batdau", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer 669`
            },
            body: JSON.stringify({
                userID: this.props.userID,
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
                alert(json.message)
            }
        });
    }
    handleChangeDuration(duration) {
        this.setState({
            duration: duration
        })
    }
    getExam() {
        let query = window.location.href.split("/")
        let param = query[query.length - 1] 
        fetch("http://localhost:9000/baikiemtra/lay/" + param, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer 669`
            }
        })
        .then(res => res.json())
        .then(res => {       
            this.setState({
                examID: param,
                data: res
            })
        })    
    }

    componentDidMount() {
        this.getExam()
    }
    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
    render() {
        const {
            data,
            status,
            mark
        } = this.state

        const s1 = {
            "textAlign": "justify"
        }

        if (!data) {
            return <img id="loading" src="https://i.imgur.com/FMpRIoS.gif"></img>   ;
        }
        return (
            <div className="product-page">
                <div className="section section-gray">
                    <div className="container">
                        <div class="main main-raised main-product">
                            <ExamHeader data={data.examInfo}/>
                            
                            <div class="row" style={s1}>
                                <div className="col-md-7">
                                    <ExamContent status={status} data={data.examInfo}/>
                                </div>
                                <div class="col">
                                    <div className="row" style={s1}>
                                        <ExamQA 
                                            status={status} 
                                            questions={data.questionInfo} 
                                            choices={data.choiceInfo}
                                            onChangeChoices={this.handleChoicesChange}
                                        />
                                    </div>
                                    <div className="row" style={s1}>    
                                        <ExamCommand 
                                            status={status}
                                            mark={mark}
                                            examInfo={data.examInfo}
                                            onChangeCommand={this.handleCommandChange}
                                            onChangeDuration={this.handleChangeDuration}
                                        />  
                                    </div>
                                </div>
                            </div>                            
                        </div>  
                    </div>
                </div>
            </div>    
        )
    }

}