import React from "react";
import { Redirect } from "react-router-dom";


function ProtectedRoute({ user,admin, children }) {
  if(!admin && user!=0) {
    return children;
  }
  else {
    if(admin=="true") return  <Redirect to='/'/>
    else if(user==0)return <Redirect to='/'/>
    else return children;
  }
}

  export default ProtectedRoute;