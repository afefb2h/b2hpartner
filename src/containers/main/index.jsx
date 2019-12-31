import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Header } from "../../components/Header";
import "./style.scss";
import { Route } from "react-router-dom";
import DriverDashboard from "./driver-user/driver-dashboard";
class MainPage extends Component {
  render() {
    return (
      <div>
        <Helmet
          titleTemplate="Box2Home driver partner"
          defaultTitle="Box2Home driver partner"
        >
          <meta name="description" content="Driver dashboard" />
        </Helmet>
        <Header />
        <div className="connected-page">
          <Route exact path="/" component={DriverDashboard} />
          <Route exact path="/driver-dashboard" component={DriverDashboard} />
        </div>
      </div>
    );
  }
}

export default MainPage;
