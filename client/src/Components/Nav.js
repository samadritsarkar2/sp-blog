import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signin, signout } from "../Api/AuthAPI";

import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Col, Row
} from "shards-react";
import "../index.css";
import "../assests/shards.css";
import "../assests/nav.css";



const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#01CBC6" };
  } else {
    return { color: "#EAF0F1" };
  }
};

// const NavMenu = ({ history }) => {

//   const [dropOpen, setDrop] = useState(false);
//   const [navOpen, setNav] = useState(false);

//   const toggleNav = () => {
//     setNav({
//       navOpen : !navOpen
//     })
//   }

//   // const navBar = () => {
//   //   return (
//   //     <div>
//   //       <Navbar sticky="top"  expand="lg" className="pb-0.5 nav-all">
//   //         <Navbar.Brand href="/" style={{color: "white"}}>
//   //           <h3> Home </h3>
//   //         </Navbar.Brand>
//   //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//   //         <Navbar.Collapse id="basic-navbar-nav" >
//   //           <Nav className="mr-auto">
//   //             <Nav.Link className="font-weight-bold" href="/posts/all" style={currentTab(history, "/all")}>
//   //               All Posts
//   //             </Nav.Link>
//   //           </Nav>

//   //         <DropdownButton variant="info" title="Members Area" >
//   //           {!isAuthenticated() && (
//   //             <Dropdown.Item className="font-weight-bold"  href="/signin" style={{color : "#2C3335"}} >
//   //               Signin
//   //               </Dropdown.Item>
//   //           )}
//   //           {!isAuthenticated() && (
//   //             <Dropdown.Item className="font-weight-bold"  href="/signup" style={{color : "#2C3335"}} >
//   //               Signup
//   //               </Dropdown.Item>
//   //           )}
//   //           {isAuthenticated() && (
//   //             <Dropdown.Item className="font-weight-bold" style={{color : "#2C3335"}}  onClick={() => {
//   //               signout(() => {
//   //                 history.push("/");
//   //               });
//   //             }} >
//   //               Signout
//   //               </Dropdown.Item>
//   //           )}
//   //           {isAuthenticated() && (
//   //             <Dropdown.Item className="font-weight-bold"  href="/new" style={{color : "#2C3335"}} >
//   //               Add Blog Post
//   //               </Dropdown.Item>
//   //           )}

//   //         </DropdownButton>
//   //         </Navbar.Collapse>
//   //       </Navbar>
//   //     </div>
//   //   );
//   // };

//   return <div>{navBar()}</div>;
// };

// export default withRouter(NavMenu);




class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  render() {
    return (
      <Navbar sticky="top" type="dark" theme="dark" expand="md">
        <Row  >
          <Col>
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarBrand href="#">Intro</NavbarBrand>
          </Col>
       

        </Row>
       
        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink style={{ color: "white" }} href="/posts/all">
                All Posts
              </NavLink>
            </NavItem>
          
          </Nav>

          <Nav navbar className="ml-auto">
            <Dropdown
              open={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
            >
              <DropdownToggle style={{ color: "white" }} nav caret>
                Members
              </DropdownToggle>
              <DropdownMenu >
                {!isAuthenticated() && (
                  <DropdownItem href="/signin" style={{ color: "black" }}>
                    Signin
                  </DropdownItem>
                )}
                {!isAuthenticated() && (
                  <DropdownItem href="/signup" style={{ color: "black" }}>
                    Signup
                  </DropdownItem>
                )}
                 {isAuthenticated() && (
                  <DropdownItem href="/user/profile" style={{ color: "black" }}>
                   User Profile
                  </DropdownItem>
                )}
                {isAuthenticated() && (
                  <DropdownItem href="/new" style={{ color: "black" }}>
                    Add Blog Post
                  </DropdownItem>
                )}

                {isAuthenticated() && (
                  <DropdownItem
                    onClick={() => {
                      signout(() => {
                        this.props.history.push("/");
                      });
                    }}
                    style={{ color: "black" }}
                  >
                    Signout
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NavBar);