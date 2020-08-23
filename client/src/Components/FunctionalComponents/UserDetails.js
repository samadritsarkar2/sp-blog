import React from 'react';
import { Row, Col, Card, CardHeader, Button, CardBody } from 'shards-react';
import { isAuthenticated } from '../../Api/AuthAPI';


const UserDetails = ({user}) => {

    return (
      <div>
        <Row>
          <Col  >
            <Card small className=" mb-4 pt-3">
              <CardHeader className="border-bottom text-center">
                <div className="mb-3 mx-auto">
                  <img
                    className="rounded-circle"
                    src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png"
                    alt={user.username}
                    width="110"
                  />
                </div>
                <h4 className="mb-0">{user.name}</h4>
                <span className="text-muted d-block mb-2">
                  @{user.username}
                </span>
                <div>
                <Button pill outline size="md" className="mb-2" href="/new" >
                  Add New Post
                </Button>
                </div>
               <div>
               <Button pill outline size="md" className="mb-2" href={"/posts/user/"+ user.username} >
                  My Posts
                </Button>
               </div>
               
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    )
    }

export default UserDetails;