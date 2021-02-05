
import React from "react";
import {link } from "react-router-dom"
 
export default class Profile extends React.Component {
  render() {
    return (
      <div>
        <h1>This is profile page</h1>
        <Link to="/">Go back to home</Link>
      </div>
    );
  }
}