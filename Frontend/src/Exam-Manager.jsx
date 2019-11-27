import React, { Component } from 'react';
import Modal from 'react-responsive-modal'; 

export default class ExamManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }

        
    }
    onOpenModal = () => {
        this.setState({ open: true });
      };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };


    render() {
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
                                            Đăng bài kiểm tra
                                        </div>
                                    </div>
                                </center>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}