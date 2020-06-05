import React from 'react'; 
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Base from './Components/Base';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import AllPosts from './Components/AllPosts';
import NewPost from './Components/NewPost';
import PrivateRoute from './PrivateRoutes';
import AdminRoute from './AdminRoutes';
import PostPage from './Components/PostPage';
import UserPosts from './Components/UserPosts';





const Routes = () => {
    return (
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/posts/all" exact component={AllPosts} />
            
            <Route path="/post/:postId" exact component={PostPage} />
            <Route path="/posts/user/:userName" exact component={UserPosts} />
            <PrivateRoute path="/new" exact component={NewPost} />
            

        </Router>
    )
}


export default Routes;