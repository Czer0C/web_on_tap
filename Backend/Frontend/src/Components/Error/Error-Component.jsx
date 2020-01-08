import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
export default class ErrorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message || "404 ERROR NOT FOUND"
        }        
    }

    render() {
        var navStyle = {
            color: "white"
        }
        return (
            <div className="product-page">
                <div className="section section-gray">
                    <div className="container">
                        <div class="main main-raised main-product">
                            <center>
                                <h2>{this.state.message }</h2>
                                <br/>
                                <NavLink className="nav-link" activeClassName="nav-link active" to="/">
                                    <i class="material-icons">arrow_back</i>Quay về trang chủ
                                </NavLink>
                            </center>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}