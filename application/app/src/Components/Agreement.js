import React from 'react';
import { Link } from "react-router-dom";

function Agreement(props) {
    return ( 
            <div>
                <h>Agreement</h>
                <br/>
                <p>read me!!!</p>
                <Link to="/register">back</Link>
            </div>
        )
};

export default Agreement;