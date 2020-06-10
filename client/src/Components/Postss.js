import React,{useState, useEffect} from 'react';
import Base from './Base';
import { getPost, getAllPosts } from '../Api/PostsAPI';
import { searchUser } from '../Api/AuthAPI';
import { Link } from 'react-router-dom';
import "../index.css";
import "../assests/allPosts.css";
import "../assests/shards.css"

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Badge,
    Button
  } from "shards-react";


const Postss = () => {

    const [ posts, setPosts ] = useState([]);
    const [pagi , setPagis] = useState({
        current : 1,
        limit : 8,
        skip : 0,
        total : 8
    });

    const {limit, skip, current, total} = pagi;

    const pagination = () => {
      
        const onNext = () =>{
            setPagis({
                skip : skip + 8,
                current : current +1,
                limit : 8
            });
            window.scrollTo(0,0);
        }

        const onPrev = () => {
          
            setPagis({
                skip : skip - 8,
                current : current -1,
                limit  : 8
            })
            window.scrollTo(0,0);
        }

        return (
            <div className="mt-30 text-center">
            <ul className="pagination justify-content-center">
                { current !=1 && (
                    <li className="page-item"><button className="btn btn-dark" onClick={onPrev}>Previous Page</button></li>
                )  }
                 <li className="page-item"><button className="btn btn-dark" > {current} </button></li>
                <li className="page-item"><button className="btn btn-dark"  onClick={onNext}>Next Page</button></li>
                
               
            </ul>
        </div>
        )
    }

    const showDesc = (desc) => {
      return {
        __html: desc
      }
    }

    const preloadData =()=>{
        getAllPosts(limit, skip)
        .then(data =>{
            if (data.error) {
                console.log(data.error);
              } else {
                setPosts(data);
              } 
        })

    };

    useEffect(()=>{
        preloadData();
    }, []);

    return (
      <div>
        <Base title="Sanganan Prayog's Blog" description="" className="container-fluid" >
          <Container fluid >
          <Row className="m-3">
            {posts.map((post, index) => {
              return (
                <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
                 
                    <Card small className="card-post ">
                    <img
                        src={post.image[0].url}
                        alt={post.title}
                        className="card-img-top h-50"
                      />
                      <CardBody>
                      <Link to={"/post/" + post._id}> <h5 className="card-title">{post.title}</h5> </Link>
                        <p className="card-text text-muted ">
                              {!post.preview_text && (
                                <span>Post Preview Text...</span>
                              )}
                              {post.preview_text && (
                                <span>{post.preview_text}</span>
                              )}
                        </p>
                      </CardBody>
                      <CardFooter className="text-muted border-top py-3">
                        <span className="d-inline-block">
                          By{" "}
                          <Link to={"/posts/user/" + post.author}>
                            {post.author}
                          </Link>
                        </span>
                      </CardFooter>
                    </Card>
                </Col>
              );
            })}
          </Row>
          </Container>
          {pagination()}
        </Base>
      </div>
    );
}
 
export default Postss;