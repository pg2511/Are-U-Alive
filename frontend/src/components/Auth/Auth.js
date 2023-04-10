import React, { useEffect, useState } from "react";
import { useGlobalContext } from '../../context/globalContext';
import Signup from "./Signup";
import Login from './Login';

function Auth() {
  
  const {singupActive, setSingupActive} = useGlobalContext();

  useEffect(() => {
  }, [setSingupActive])
  

  return(
    <div>
    {singupActive ? <Signup/> : <Login/>}
    </div>
  ) ;
}

export default Auth;
