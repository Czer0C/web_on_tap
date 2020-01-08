import React, { Component } from 'react';





export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info
        }
    }

    componentDidMount() {
    }
    render() {
        const {
            info
        } = this.state

        let headers = Object.keys(info[0])

        return(


                    <table class="table">
                            <thead>
                                <tr>
                                    {headers.map((item, index) => (
                                        <th class="text-center">
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        <tbody>
                            {
                                info.map((item, index) => (
                                    <tr>
                                        {headers.map((item2, index2) => (
                                            <td class="text-center">{item[item2]}</td>
                                        ))}
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
        )
    }
}