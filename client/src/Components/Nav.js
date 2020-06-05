import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signin, signout } from "../Api/AuthAPI";
import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import "../index.css" ;  

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#01CBC6" };
  } else {
    return { color: "#EAF0F1" };
  }
};

const NavMenu = ({ history }) => {
  const navBar = () => {
    return (
      <div>
        <Navbar sticky="top"  expand="lg" className="pb-0.5 nav-all">
          <Navbar.Brand href="/" style={{color: "white"}}>
            <h3> Home </h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="mr-auto">
              <Nav.Link className="font-weight-bold" href="/posts/all" style={currentTab(history, "/all")}>
                All Posts
              </Nav.Link>
            </Nav>

          <DropdownButton variant="info" title="Members Area" >
            {!isAuthenticated() && (
              <Dropdown.Item className="font-weight-bold"  href="/signin" style={{color : "#2C3335"}} > 
                Signin
                </Dropdown.Item>
            )}
            {!isAuthenticated() && (
              <Dropdown.Item className="font-weight-bold"  href="/signup" style={{color : "#2C3335"}} > 
                Signup
                </Dropdown.Item>
            )}
            {isAuthenticated() && (
              <Dropdown.Item className="font-weight-bold" style={{color : "#2C3335"}}  onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }} > 
                Signout
                </Dropdown.Item>
            )}
            {isAuthenticated() && (
              <Dropdown.Item className="font-weight-bold"  href="/new" style={{color : "#2C3335"}} > 
                Add Blog Post
                </Dropdown.Item>
            )}

          </DropdownButton>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };

  return <div>{navBar()}</div>;
};

export default withRouter(NavMenu);
