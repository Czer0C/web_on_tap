import React from 'react';
import { BrowserRouter as Link ,Route,  Switch } from 'react-router-dom';

import Header from './Header';
import ExamContainer from './Exam-Container';
import './assets/css/material-kit.css';
import ExamManager from './Exam-Manager';
import ErrorComponent from './Error'
import HomeComponent from './Home';
import CompareComponent from './Compare-Component';

const GenericRoute = (Component) => {	
	return (
        (props) => (
			<React.Fragment>
				<Header/>
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
