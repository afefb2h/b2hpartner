import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "./style.scss";
import { DashboardService } from "../../../../services/dashboard-service";
class DriverDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iframeUrl: null
    };
  }
  componentDidMount() {
    const iframeUrl = DashboardService.getDashboarDriver();
    this.setIframeUrl(iframeUrl);
  }

  setIframeUrl(val) {
    this.setState({ iframeUrl: val });
  }

  render() {
    const { iframeUrl } = this.state;
    return (
      <div className="canal-list-page">
        <Helmet
          titleTemplate="Box2Home driver partner"
          defaultTitle="Box2Home driver partner"
        >
          <meta name="description" content="Driver dashboard" />
        </Helmet>
        <div className="dashboar-iframe">
          {iframeUrl && iframeUrl !== null && (
            <iframe
              src={iframeUrl}
              frameborder="0"
              width="800"
              height="600"
              allowtransparency
            ></iframe>
          )}
        </div>
      </div>
    );
  }
}
export default DriverDashboard;
