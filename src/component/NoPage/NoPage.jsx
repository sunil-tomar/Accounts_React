import "./NoPage.css";
import React from "react";
import error_404_jpg from '../../assets/img/404.jpg';
import error_404_webp from "../../assets/img/404_error.webp"

function template() {
  return (
    <div className="no-page">
      <h1>Provide URL is not Correct, There is NoPage with specified URL</h1>
      {/* <img src={error_404_webp} alt="image"/> */}
    </div>
  );
};

export default template;
