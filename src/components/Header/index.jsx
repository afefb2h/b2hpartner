import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticationActions } from "../../actions";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/driver-dashboard">
          b2h
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/driver-dashboard">
                Driver dashboard
              </Link>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  this.props.dispatch(authenticationActions.logout());
                }}
              >
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  console.log("ssss", state);
  const { loggingIn } = state.global.authentication;
  return {
    loggingIn
  };
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };
