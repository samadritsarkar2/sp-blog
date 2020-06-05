import React from "react";
import Base from "./Base";
import { useState, useEffect } from "react";
import { getPost, deletePost } from "../Api/PostsAPI";
import { searchUser, isAuthenticated } from "../Api/AuthAPI";
import { Link } from "react-router-dom";

const PostPage = ({ match, location }) => {
  const { user, token } = isAuthenticated();
  const [post, setPost] = useState({
    id: "",
    title: "",
    description: "",
    img_src: "",
    author: "",
    postDate : ""
  });
  const { id, title, description, img_src, author, postDate  } = post;

  
  const preloadData = () => {
    var id = match.params.postId;
    getPost(id).then((data) => {

      let date = new Date(data.createdAt);
      const pDate = date.toDateString();
      setPost({
        id: data._id,
        title: data.title,
        description: data.post_text,
        img_src: data.image[0].url,
        author: data.author,
        postDate : pDate
      });
    });
  };

  useEffect(() => {
    preloadData();
  });

  const delButton = () => {
    alert("Are you sure you want to delete this post?");
    var postId = id;
    var userId = user._id;
    deletePost(postId, userId, token).then((data) => {});
  };

  const username = () => {
    searchUser(user).then((fetcheduser) => {});
  };


  const showPost = () => {
    return (
      <div>
        <div className="row text-dark justify-content-center">
          <div className="col-md-12">
            <img src={img_src} alt={title} style={{maxWidth: "100%", maxHeight : "100"}} className="img-fluid rounded" />
          </div>
          </div>
          
          <div className="row">
          <div className="col-md-12">
          <hr style={{ color : "#2C3335", backgroundColor : "#2C3335", height : "0.01px"}}></hr>
            <ul className="list-inline">
              <li className="list-inline-item">By <Link to={"/posts/user/"+ post.author}><span className="card-text author-link" >{post.author}</span></Link>/</li>
              <li className="list-inline-item"> {postDate} /</li>
            </ul>
            <hr style={{ color : "#2C3335", backgroundColor : "#2C3335", height : "0.01px"}}></hr>
            <div
              dangerouslySetInnerHTML={{
                __html: description
              }}
            ></div>
            <p>
              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <button className="btn btn-info" onClick={delButton}>
                  Delete
                </button>
              )}
            </p>
          </div>
          </div>
        </div>
      
    );
  };

  return <Base title={title} className="container" >{showPost()}</Base>;
};

export default PostPage;
