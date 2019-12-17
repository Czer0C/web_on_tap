import React, {Component} from 'react';
import { BrowserRouter as Link ,Route,  Switch } from 'react-router-dom';

import './assets/css/material-kit.css';
import Header from './Components/Header/Header-Component';
import ExamManager from './Components/Exam-Manager/Exam-Manager';
import ErrorComponent from './Components/Error/Error-Component'
import HomeComponent from './Components/Home/Home-Component';
import CompareComponent from './Components/Leaderboard/Compare-Component';

import ExamContainer from './Components/Exam-Main/Exam-Container';

import "./assets/js/bootstrap-material-design.js"

const GenericRoute = (Component, userGrade, userID, username) => {	
	return (
        (props) => (
			<React.Fragment>
				<Component userGrade={userGrade} userID={userID} username={username}/>
			</React.Fragment>
		)
	)
};


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 23,
            userGrade: -1,
            username: ""
        }
    }

    getUserInfo() {
        fetch("http://localhost:9000/users/thongtincanhan/" + this.state.userID)
        .then(res => res.json())
        .then(json => {
            this.setState({
                userID: json[0].MaNguoiDung,
                username: json[0].HoTen,
                userGrade: json[0].Lop
            })
        });
    }

    componentDidMount() {
        this.getUserInfo()
    }

    render() {
        const {
            userID, 
            userGrade,
            username
        } = this.state

        return (  
            
            <div className="index-page">
                {
                    username === "" ? 
                    "Đang tải..." : 
                    <Link>
                        <React.Fragment>
                            <Header userGrade={userGrade} userID={userID} username={username}/>
                            <Switch>                        
                                <Route exact path="/" render={GenericRoute(HomeComponent, userGrade, userID, username)} />
                                <Route path="/luyen/:mabaikiemtra" render={GenericRoute(ExamContainer, userGrade, userID, username)} />
                                <Route exact path="/admin" render={GenericRoute(ExamManager, userGrade, userID, username)} />
                                <Route exact path="/sosanh" render={GenericRoute(CompareComponent, userGrade, userID, username)} />
                                <Route path="/:wrong" render={GenericRoute(ErrorComponent)} />
                            </Switch>
                        </React.Fragment>
                    </Link>
                }
            </div>
        )
    }
}