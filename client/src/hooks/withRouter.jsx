import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const withRouter = (Component) => (props) => {     // hocs để truyền các props qua các component
  const navigate = useNavigate();
  const location = useLocation();
  return <Component navigate={navigate} location={location} {...props} />;
};

export default withRouter;
