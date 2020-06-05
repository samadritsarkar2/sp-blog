import React, { useState } from 'react';
import Base from './Base';
import { createPost } from '../Api/PostsAPI';
import { isAuthenticated } from '../Api/AuthAPI';
import { Redirect } from 'react-router-dom';
import ReactQuill from "react-quill";
import "../assests/quill.css";


const NewPost = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    title: "",
    image: "",
    img_prev : null,
    error: "",
    loading: false,
    didRedirect: false,
    formData: new FormData(),
  });
  const [quill, setQuill] = useState("");
  
  const {
    title,
    image,
    img_prev,
    error,
    loading,
    didRedirect,
    formData,
  } = values;

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleImageChange = (event) => {
    event.preventDefault();
    let fi = event.target.files[0];
    let reader = new FileReader();

    formData.set("image",fi);
    setValues({...values, image : fi});
    
    reader.onloadend = () => {
      setValues({...values,img_prev : reader.result})
    }

    reader.readAsDataURL(fi);
  }

  const quillChange = (value) => {
    setQuill(value);
    formData.set("post_text", quill);
  }

 var modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link'],
    ['clean']
  ],
  }

 var formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link'
  ]

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createPost(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          post_text: "",
          image: "",
          error: "",
          loading: false,
          didRedirect: true,
        });
      }
    });
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Post is being created...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const didRedirectFunction = () => {
    if (didRedirect) {
      return <Redirect to="/posts/all" />;
    }
  };

  const PostForm = () => {
    return (
      <form encType="multipart/form-data">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="title"
            value={title}
            onChange={handleChange("title")}
            placeholder="Your Post Title"
          />
        </div>
        <div className="form-group" >
        
        </div>
        <div className="form-group">
          <ReactQuill
            placeholder="Write your blog post here..."
            style={{ minHeight: 18 }}
            name="post_text"
            modules={modules}
            formats={formats}
            value={quill}
            onChange={quillChange}
          />
        </div>
        <div className="form-group">
       
              {true && (
                <label
                  className="btn btn-block btn-outline-dark"
                  htmlFor="image"
                >
                  <input
                    type="file"
                    name="image"
                    className="form-control-file"
                    placeholder="choose a image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
         
        </div>
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-dark btn-block mb-3"
        >
          Submit
        </button>
      </form>
    );
  };
  return (
    <div >
      <Base title="Add New Post" description="" className="container rounded text-dark p-4 " >

      <div className="row card-deck">
        <div className=" col-sm-12  col-lg-4 container card ">
        <span className="card-header">
          Preview
        </span>
        { (!img_prev || !title) && (
          <p className="text-center text-muted">A post Preview will appear here...</p>
        )}

        {img_prev && (
                <img
                  src={img_prev}
                  style={{maxWidth : "100%", maxHeight : "auto" }}
                  className="container img-thumbnail mt-3"
                />
              )}
              {title && (
                <div className="card-title text-center">
                  {title}
                </div>
              )}
        </div>
        <div className=" col-sm-12 col-lg-8  container card">
        <span className="card-header mb-3">
          Editor
        </span>
        {loadingMessage()}
        {errorMessage()}
        {didRedirectFunction()}
        {PostForm()}
        </div>
      </div>
      </Base>
    </div>
  );
};
 
export default NewPost;