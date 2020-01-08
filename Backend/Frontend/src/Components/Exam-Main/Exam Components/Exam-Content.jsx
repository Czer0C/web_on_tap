import React, { Component } from 'react';

export default class ExamContent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        let info = JSON.parse(this.props.data)
        
        this.setState({
            title: info[0].TuaDe,
            content: info[0].NoiDungBaiDoc,
            author: info[0].TenTacGia,
            note: info[0].GhiChu

        })
    }
    splitParagraph(content) {
        if (typeof(content) === undefined) return
        
        var s = content.split("\n")
        return s;
    }
    render() {
        const {
            status
        } = this.props

        const {
            title,
            content,
            author,
            note
        } = this.state
        return (
            <div class="col-md-12 col-sm-12">
            <div class="card card-nav-tabs" >
                <div class="card-header card-header-info">
                    <center><h4>{title}</h4> </center> 
                </div>
                {
                    status === 0 ? null :
                    <div className="card-body">
                        {
                            this.splitParagraph(content).map((item, index) => (
                                <p key={index}>{item}</p>   
                            ))
                        }
                        <center><p><b>Theo {author}</b></p></center>
                        <p>{note}</p>
                    </div>
                }
                
            </div>
        </div>
        )
    }
}