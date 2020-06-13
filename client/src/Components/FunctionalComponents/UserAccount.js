import React, { useState }  from "react";
import PropTypes from "prop-types";
import {updateUser} from "../../Api/AuthAPI";

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import { useEffect } from "react";

const UserAccount = ({user, token}) => {


    const [values, setValues] = useState({
        name : "",
        username : "",
        email : "",
        userAvatar : "",
        user_description : "",
        position : "",
        formData : new FormData(),
        password : "",
        error : "",
        loading : false,
        success : false
    });

    const {name, username,userAvatar, user_description, email,position, password, formData , error, loading, success} = values;

    const preloadData = () => {
      setValues({
        name : user.name,
        username : user.username,
        email : user.email,
        userAvatar : "",
        user_description : user.user_description,
        position : user.position,
        error : "",
        loading : false,
        success : false
      })
    }

    useEffect(()=>{
      preloadData();
  }, [user.name]);

    const handleChange = name => event => {
        setValues({ ...values, error : false, [name] : event.target.value});
    }

    const onSubmit = (event) => {
      event.preventDefault();
      setValues({...values, error : false, loading : true})
      updateUser({name, email}, user._id, token )
      .then(data => {
          if(data.error){
              setValues({...values, error:data.error, loading:false})
          } else {
            console.log("Hello-", data)
             setValues({
            name : data.name,
             username : data.username,
             email : data.email,
             user_description : data.user_description,
             position : data.position,
             })
              
          }
      })
      .catch(err => console.log("Update request failed", err));
  }
    

    // const handleImageChange = (event) => {
    //     event.preventDefault();
    //     let fi = event.target.files[0];
    //     let reader = new FileReader();
    
    //     formData.set("userAvatar",fi);
    //     setValues({...values, userAvatar_prev  : fi});
        
    //     reader.onloadend = () => {
    //       setValues({...values,userAvatar : reader.result})
    //     }
    
    //     reader.readAsDataURL(fi);
    //   }

    return (
<Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">Update Account</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
               
                <Col md="12" className="form-group">
                  <label htmlFor="FullName">Full Name</label>
                  <FormInput
                    id="FullName"
                    placeholder="Full Name"
                    value={name}
                    onChange={handleChange("name")}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleChange("email")}
                    autoComplete="email"
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                    disabled
                    type="password"
                    id="fePassword"
                    placeholder="Password"
                    value="EX@MPL#P@$$w0RD"
                    onChange={() => {}}
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
             
              <Row form>
                {/* City */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePost">Position</label>
                  <FormInput
                    id="fePost"
                    placeholder="User's Position..."
                    value={position}
                    onChange={handleChange("position")}
                  />
                </Col>
                {/* State */}
                <Col md="6" className="form-group">
                  <label htmlFor="feInputState">Author Avatar</label>
                  <Button disabled theme="dark" className="m-0" >
                  <input
                  disabled
                    type="file"
                    name="userAvatar"
                    className="form-control-file m-0"
                    placeholder="choose a image"
                    accept="image/*"
                    onChange={() => {}}
                  />
                  </Button>
                </Col>
              </Row>
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Description</label>
                  <FormTextarea id="feDescription" rows="5" value={user_description} onChange={handleChange("user_description")} />
                </Col>
              </Row>
              <Button theme="primary" onClick={onSubmit} >Update Account</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
    )
}
  



export default UserAccount;
