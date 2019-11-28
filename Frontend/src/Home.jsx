import React, { Component } from 'react';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

        
    }

    getData() {
        fetch("http://localhost:9000/users/laybaikiemtra")
        .then(res => res.text())
        .then(res => {
            this.setState({
                data: JSON.parse(res)
            })

        });
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const {
            data
        } = this.state
        
        const cardStyle = {
            "width": "20rem"
        }

        if (data.length === 0) {
            return <span>Loading...</span>;
        }

        return (
            <div className="product-page">
                <div className="section section-gray">
                    <div className="container">
                        <div class="main main-raised main-product">
                            <center>Các bài kiểm tra hiện tại</center>
                            <div class="card" style={cardStyle}>
                                <div class="card-body">
                                    <h4 class="card-title">Card title</h4>
                                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#0" class="card-link">Card link</a>
                                    <a href="#0" class="card-link">Another link</a>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}