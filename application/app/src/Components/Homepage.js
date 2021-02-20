import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

// To do : remove token on signout 
function Homepage(props){
    var location = useLocation();
    return(
        <>
        <h1>{location.state.token}</h1>
        <h2>{location.state.accountID}</h2>
        <div>
            <Link to="/">signout</Link>
        </div>
        
        </>
    );
}
export default Homepage