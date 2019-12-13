import React, { Component } from 'react';

export default class ErrorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        
    }

    render() {
        return (
            <div className="product-page">
                <div className="section section-gray">
                    <div className="container">
                        <div class="main main-raised main-product">
                        <center><h1>404 not found</h1></center>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}