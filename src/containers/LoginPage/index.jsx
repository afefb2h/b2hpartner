import React, { Component } from "react";
import { requiredValidation, validEmailRegex } from "../../validations";
import "./style.scss";
import { connect } from "react-redux";
import { authenticationActions } from "../../actions";
import { alertActions } from "../../actions";
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {
        fullName: "",
        email: "",
        password: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    if (name === "email") {
      this.setState({ email: event.target.value });
      errors.email = validEmailRegex.test(value) ? "" : "Email non valide!";
    }
    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (requiredValidation(this.state.errors)) {
      console.info("Valid Form", this.state);
      const { email, password } = this.state;
      if (email && password) {
        const { dispatch } = this.props;
        dispatch(authenticationActions.login(email, password));
      }
    } else {
      console.error("Invalid Form", this.state);
    }
  };

  render() {
    const { loggingIn, alert } = this.props;
    const { email, password } = this.state;
    const appTitle = process.env.REACT_APP_ATITLE;
    return (
      <div className="login-page">
        {alert && alert !== null && alert.message && (
          <div className={`alert ${alert.type}`}> {alert.message}</div>
        )}
        <form
          className="partner-form login-form border border-info rounded"
          onSubmit={this.handleSubmit}
        >
          <h2 className="form-title text-info font-weight-900">{appTitle}</h2>
          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-outline-info float-sm-right"
            >
              Connexion
            </button>
            {loggingIn && (
              <img
                alt="loadin"
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
            )}
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("ssss", state);
  const { loggingIn, alert } = state.global.authentication;
  return {
    loggingIn,
    alert
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };

//export default LoginPage;
