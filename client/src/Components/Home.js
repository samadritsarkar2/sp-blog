import React, {useState} from 'react';
import Base from './Base';
import Nav from './Nav';
import '../index.css';
import { Link } from 'react-router-dom';
import { Carousel } from "react-bootstrap";

const Home = () => {

  
  

    return (
      <div>
        <Nav />
        <div className="container">
          <div className="jumbotron bg-light mt-2">
            <div className="container">
              <h1 className="text-dark">Sanganan Prayog Blog</h1>
              <p className=" des text-lg-right font-weight-bolder">
                Under Construction...
              </p>
              <p className=" des text-lg-right font-weight-bolder">
                Homepage will be updated ASAP...
              </p>
            </div>
          </div>
        </div>

     
      
       
          </div>
          
    );
}
 
export default Home;