import React from "react";
import "../styles/SeRe.css";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const SeRe = () => {
  
  return (
    <div className="bg-sere">
      <div className="container-sere-fluid">
        <div className="row-sere align-items-center h-100">
          <div className="col-md-6 col-sm-12 d-flex justify-content-center justify-content-md-start">
            <div className="logo2-container">
              <img src={logo} alt="Logo" className="logo2 img-fluid" />
            </div>
          </div>
          <div className="butsere col-md-6 col-sm-12 d-flex justify-content-center ">
            <div className="buttons-sere-container col-sm-12">
              <Link to="/donor">
                <button className="btn-send">Sender</button>
              </Link>
              <div className="separator">or</div>
              <Link to="/receiver">
                <button className="btn-receive">Receiver</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeRe;
