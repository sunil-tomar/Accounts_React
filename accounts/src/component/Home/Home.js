import React    from "react";
import template from "./Home.js";
import './Home.css';

class Home extends React.Component {

  render() {
   // return template.call(this);
    return <div className="home-container">
    <h2 className="title_head">Hi Home Page welcomes you</h2>
  </div>;
  }
}

export default Home;
