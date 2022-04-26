import React from "react";
import { Redirect } from "react-router-dom";


function ProtectedRouteAdmin({ user,admin, children }) {
  if (user!=0 && admin==true) {
    
   return children;
  } 
  else  {
    if(admin=="false") return  <Redirect to='/'/>
    else if(user==0)return <Redirect to='/'/>
    else {  return children;}

  }
}

  export default ProtectedRouteAdmin;