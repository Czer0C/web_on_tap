import React, {Component} from 'react';
import { BrowserRouter as Link ,Route,  Switch } from 'react-router-dom';
import {getFromStorage} from './utility/storage';

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
import Login from './Components/Login/Login';
import "./App.css"; 
import Register from './Components/Register/Register';



const GenericRoute = (Component, userGrade, userID, username, userType) => {	
	return (
        (props) => (
			<React.Fragment>                
                <Header userGrade={userGrade} userID={userID} username={username} userType={userType}/>
				<Component userGrade={userGrade} userID={userID} username={username} userType={userType}/>
			</React.Fragment>
		)
	)
};

const ProtectedRoute = (Component, userGrade, userID, username, userType) => {	
	return (
        (props) => (
            <React.Fragment>                
                    <Header userGrade={userGrade} userID={userID} username={username} userType={userType}/>
            {
                userType > 1 ? (
                    <Component userGrade={userGrade} userID={userID} username={username} userType={userType}/>
                    
                        
                    
                ) : (
                    <ErrorComponent message="Đây là trang của giáo viên, bạn không được phép truy cập!"/>
                )
            }
            
            </React.Fragment>
        )
    )
};
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const signin = getFromStorage('signin')
        if (signin) {
            this.setState({
                username: signin.username,
                userID: signin.userID,
                userGrade: signin.userGrade,
                userType: signin.userType
            })
        }
        else {
            this.setState({
                username: "Guest",
                userID: -1,
                userGrade: -1,
                userType: -1
            })
        }
        
    }

    render() {
        const {
            userID, 
            userGrade,
            username,
            userType
        } = this.state

        return (  
            <div className="index-page">
                {
                    !username ? 
                    <img id="loading" src="https://i.imgur.com/FMpRIoS.gif"></img> : 
                    <Link>  
                        <React.Fragment>
                            <Switch>                        
                                <Route exact path="/" render={GenericRoute(HomeComponent, userGrade, userID, username, userType)} />
                                <Route exact path="/dangnhap" render={GenericRoute(Login)}></Route>
                                <Route exact path="/dangky" render={GenericRoute(Register)}></Route>
                                <Route exact path="/canhan" render={GenericRoute(Profile, userGrade, userID, username, userType)} />
                                <Route path="/luyen/:mabaikiemtra" render={GenericRoute(ExamContainer, userGrade, userID, username, userType)} />

                                <Route exact path="/admin" render={ProtectedRoute(ExamManager, userGrade, userID, username, userType)} />

                                <Route exact path="/sosanh" render={GenericRoute(CompareComponent, userGrade, userID, username, userType)} />
                                <Route path="/:wrong" render={GenericRoute(ErrorComponent)} />
                            </Switch>
                        </React.Fragment>
                    </Link>
                }
            </div>
        )
    }
}