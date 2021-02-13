import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Homepage(props){
    return(
        <>
        <h>This is the homepage</h>
        <div>
            <Link to="/">signout</Link>
        </div>
        
        </>
    );
}
export default Homepage