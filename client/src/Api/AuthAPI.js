import { API } from "../backend";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";

export const signup = async (user) => {
    try {
          const response = await fetch(`${API}/signup`, {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
          });
          return response.json();
      }
      catch (err) {
          return console.log(err);
      }
  };
 
 
  export const signin = async (user) => {
    try {
          const response = await fetch(`${API}/signin`, {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
          });
          return response.json();
      }
      catch (err) {
          return console.log(err);
      }
  };
  
 export const authenticate = (data,next) => {
     if (typeof window !== "undefined") {
         localStorage.setItem("jwt", JSON.stringify(data));
         next();
     }
 }
 
  
 export const signout = next => {
     if(typeof window !== "undefined"){
         localStorage.removeItem("jwt");
         next();
 
         return fetch(`${API}/signout`, {
             method : "GET"
         })
         .then(response => console.log("SIGNOUT Success !"))
         .catch(err => console.log(err))
 
     }
 }
 
 export const isAuthenticated = ( ) => {
     if( typeof window == "undefined") {
         return false
     }
     if(localStorage.getItem("jwt")){
         let parsedJwt = JSON.parse(localStorage.getItem("jwt"));
         const { token } = parsedJwt;
         let {exp} = jwt_decode(token);
         if (Date.now() >= exp * 1000) {
            if(typeof window !== "undefined"){
                localStorage.removeItem("jwt");
                fetch(`${API}/signout`, {
                    method : "GET"
                })
            }
            return false;
          }
         return JSON.parse(localStorage.getItem("jwt"));
     } else {
         return false;
     }
 }
 
export const updateUser = async (user, userId, token) => {
    try {
        const response = await fetch(`${API}/user/${userId}` ,{
            method: "PUT",
            headers : {
                Accept : "application/json",
                Authorization : `Bearer ${token}`
            },
            body : JSON.stringify(user)
        });
        return response.json();
    } catch (err) {
        console.log("Update failed!!");
    }
}


export const searchUser = async (userId, token) => {
  try {
    const response = await fetch(`${API}/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization : `Bearer ${token}`
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
}; 