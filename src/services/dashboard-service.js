import * as jwt from "jsonwebtoken";
export const DashboardService = {
  getDashboarDriver
};
function getDashboarDriver() {
  const METABASE_SITE_URL = process.env.REACT_APP_METABASE_SITE_URL;
  const METABASE_SECRET_KEY = process.env.REACT_APP_METABASE_SECRET_KEY;
  const connectedUser = localStorage.getItem("user");
  if (connectedUser && connectedUser !== null) {
    const payload = {
      resource: { dashboard: process.env.REACT_APP_DASHBOARD },
      params: {
        soci_t__chauffeur: connectedUser.companyName
      }
    };
    console.log("payload", process.env.REACT_APP_METABASE_SECRET_KEY);
    const token = jwt.sign(payload, process.env.REACT_APP_METABASE_SECRET_KEY);
    return `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;
  } else {
    return null;
  }
}
