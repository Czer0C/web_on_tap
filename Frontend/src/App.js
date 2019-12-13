import React from 'react';
import { BrowserRouter as Link ,Route,  Switch } from 'react-router-dom';

import './assets/css/material-kit.css';
import Header from './Components/Header/Header-Component';
import ExamManager from './Components/Exam-Manager/Exam-Manager';
import ErrorComponent from './Components/Error/Error-Component'
import HomeComponent from './Components/Home/Home-Component';
import CompareComponent from './Components/Leaderboard/Compare-Component';

import ExamContainer from './Components/Exam-Main/Exam-Container';
const GenericRoute = (Component) => {	
	return (
        (props) => (
			<React.Fragment>
				<Component {...props}/>
			</React.Fragment>
		)
	)
};

function App() {
    return (  
        <div className="index-page">
             <Link>
                <React.Fragment>
				    <Header/>
                    <Switch>                        
                        <Route exact path="/" render={GenericRoute(HomeComponent)} />
                        <Route exact path="/luyen" render={GenericRoute(ExamContainer)} />
                        <Route exact path="/admin" render={GenericRoute(ExamManager)} />
                        <Route exact path="/sosanh" render={GenericRoute(CompareComponent)} />
                        <Route path="/:wrong" render={GenericRoute(ErrorComponent)} />
                    </Switch>
                </React.Fragment>
            </Link>
        </div>
    )
}

export default App;
