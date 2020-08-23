import React from 'react';
import {API} from '../backend';

export const createPost = async (userId, token, post) =>{
    try {
        const response = await fetch(`${API}/post/create/${userId}`,{
            method : "POST",
            headers : {
                Accept : "application/json",
                Authorization : `Bearer ${token}`
            },
            body : post
        })
        return response.json();
    } catch (err) {
        return console.log(err);
    }
}

export const getPost = async (postId) => {
    try {
        const response = await fetch(`${API}/post/${postId}`, {
            method : "GET"
        })
        return response.json();
    } catch (err) {
        return console.log(err)
    }
}


export const getAllPosts = async (limit, skip) => {
    try {
        const response = await fetch(`${API}/posts/?limit=${limit}&skip=${skip}`, {
            method : "GET"
        })
        return response.json();
    } catch (err) {
        return console.log(err);
    }
}

export const authorPost = async (userName,limit, skip) =>{
    try {
        const response = await fetch(`${API}/posts/user/${userName}/?limit=${limit}&skip=${skip}`,{
            method : "GET"
        })
        return response.json();
    } catch (err) {
        return console.log(err);
    }
}

export const deletePost = async (postId, userId, token) => {
    try {
        const response = await fetch(`${API}/post/${postId}/${userId}`, {
            method : "DELETE",
            headers : {
                Accept : "application/json",
                Authorization : `Bearer ${token}`
            },
        })
        return response.json();
    } catch (err) {
        return console.log(err);
    }
}

