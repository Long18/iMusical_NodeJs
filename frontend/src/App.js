import React, { Component } from "react";
import { Route, BrowserRouter } from 'react-router-dom'
import routes from './components/pages/index'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
    render() {
        return (
          <BrowserRouter>
		  {
		      routes.map((data,idx) => (
		         <Route exact path={data.path} component={data.component} key={idx}></Route>
		      ))
		  }
          </BrowserRouter>
      );
    }
  }
  
  export default withRouter(App);
	