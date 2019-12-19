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
import "./Components/Home/Home.css";
import Profile from './Components/Profile/Profile';



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
            userID: this.props.userID,
            userGrade: this.props.userGrade,
            username: this.props.username
        }
    }

    componentDidMount() {
        console.log(this.props)
        // this.getUserInfo()
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
                    <img id="loading" src="https://i.imgur.com/FMpRIoS.gif"></img> : 
                    <Link>
                        <React.Fragment>
                            <Header userGrade={userGrade} userID={userID} username={username}/>
                            <Switch>                        
                                <Route exact path="/" render={GenericRoute(HomeComponent, userGrade, userID, username)} />
                                <Route exact path="/canhan" render={GenericRoute(Profile, userGrade, userID, username)} />
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