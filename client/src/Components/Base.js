import React from 'react';

import Nav from './Nav';
import { API } from '../backend';


const Base = (
    {
        title = "My Title",
        description = "",
        className="container bg-light rounded text-dark p-4",
        homePage = "container bg-light justify-content-end",
        children
      }
) => {
    return (
      <div >
        <Nav />
        <div className="container">
          <div className="container bg-light text-center p-2 mb-2">
            <h2 className="display-4"> {title} </h2>
            <p className="lead"> {description} </p> 
          </div>
        </div>
        <p className={className}> {children} </p>
      </div>
    );
}
 
export default Base;