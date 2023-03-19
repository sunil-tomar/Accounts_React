import "./Menu.css";
import React,{lazy,Suspense} from "react";
import {Route,HashRouter,Redirect,Switch} from 'react-router-dom';
const Home=lazy(()=>import('../Home/index'))
const About=lazy(()=>import('../About/index'))
const Contact=lazy(()=>import('../Contact/index'))

function template() {
  return (
    <div className="menu">
        <div className="menu-items">
            <a href="#/home">Home</a>
            <a href="#/about">About</a>
            <a href="#/contact">Contact</a>
          </div>
          <div className="mb-50">
          <Suspense fallback="Loading..."> 
            <HashRouter>  
              <Switch>
                <Route path="/" exact component={Home}  />
                <Route path="/home" component={Home}  />
                <Route path="/about" render={(props) => (
                      <About />
                    )} />
                <Route path="/contact" component={Contact}  />
                <Redirect to ='/' />
              </Switch>
            </HashRouter>
          
      </Suspense>
      </div>
        


    </div>
  );
};

export default template;