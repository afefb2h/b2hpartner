import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { LoginPage } from "./containers/LoginPage";
import MainPage from "./containers/main";
import { PrivateRoute } from "./components/PrivateRoute";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from "./utils/history";
import { alertActions } from "./actions";
import NotFoundPage from "./containers/main/not-found-page";
class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    console.log("***", this.props);
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }
  render() {
    const { alert } = this.props;
    console.log("aaa", alert);
    return (
      <div className="main">
        {alert && alert !== null && alert.message && (
          <div className={`alert ${alert.type} main-alert `}>
            {" "}
            {alert.message}
          </div>
        )}
        <Router>
          <Helmet
            titleTemplate="Box2Home partner"
            defaultTitle="Box2Home partner"
          >
            <meta name="description" content="Box2Home partner connexion" />
          </Helmet>

          <Switch>
            <PrivateRoute path="/login" component={LoginPage} />
            <PrivateRoute exact path="" component={MainPage} />
            <Route path="/404" component={NotFoundPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { alert } = state.global;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
