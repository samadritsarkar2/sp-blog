import React from 'react';
import { Row, Col, Card, CardHeader, Button } from 'shards-react';
import { isAuthenticated, searchUser } from '../Api/AuthAPI';
import Base from './Base';
import UserDetails from "./FunctionalComponents/UserDetails";
import UserAccount from './FunctionalComponents/UserAccount';
import { useState } from 'react';


const UserProfile = () => {

    const {user, token } = isAuthenticated();

    const [userDb, setUserDb] = useState("");

    searchUser(user._id, token).then(data => {
        if(data.error)
        {
            console.log("ERROR ! User not found");
        }
      setUserDb(data);
    
    })

return (
    <Base title="User Profile">
        <Row >
            <Col lg="4" >
            <UserDetails user={userDb} />
            </Col>
            <Col lg="8">
                <UserAccount user={userDb} token={token} />
            </Col>
        </Row>
  
    </Base>
)

}

export default UserProfile;