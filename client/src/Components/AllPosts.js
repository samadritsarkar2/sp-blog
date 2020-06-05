import React,{useState, useEffect} from 'react';
import Base from './Base';
import { getPost, getAllPosts } from '../Api/PostsAPI';
import { searchUser } from '../Api/AuthAPI';
import { Link } from 'react-router-dom';
import "../index.css";
import "../assests/allPosts.css";


const AllPosts = () => {

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
                 {total>0 && (<li className="page-item"><button className="btn btn-dark" onClick={onNext}>Next Page</button></li>)}
                
               
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
        <Base title="Sanganan Prayog's Blog" description="">
          <div className="row text-dark">
          <div className="card-deck">
               {posts.map((post, index) => {
                return (
                  <div
                    key={index}
                    className="col-lg-3 col-sm-6 mb-3 "
                  >
                    <Link  to={"/post/" + post._id}>
                    <div className="card card_all h-100">
                      <img
                        src={post.image[0].url}
                        alt={post.title}
                        className="card-img-top img-thumbnail h-50 "
                      />
                      <div className="card-body pt-1 pb-1">
                        <h5 className="card-title text-center">{post.title}</h5>
                        <p className="card-text text-muted post_text_prev">
                          <div
                            dangerouslySetInnerHTML={showDesc(post.post_text)}
                          ></div>
                          ...
                        </p>
                        By <Link to={"/posts/user/"+ post.author}><span className="card-text author-link" >{post.author}</span></Link>
                      </div>
                     </div>
                    </Link>
                  </div>
                );
              })} 
              
            </div>
            </div>
          
          {pagination()}
        </Base>
      </div>
    );
}
 
export default AllPosts;