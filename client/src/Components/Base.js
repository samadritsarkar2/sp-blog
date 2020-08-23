import React from 'react';

import Nav from './Nav';
import { API } from '../backend';

import { Container } from "shards-react";

const Base = (
    {
        title = "My Title",
        description = "",
        className="container rounded text-dark p-4",
        children
      }
) => {
    return (
      <div >
        <Nav />
        <Container >
          <Container fluid className="p-2 mb-2" />
         
            <h2 className="display-4" > {title} </h2>
            <p className="lead"> {description} </p> 
  
          </Container>      
            <p className={className}> {children} </p>
      </div>
    );
}
 
export default Base;