import Axios from './serviceApi';
import { serviceAccount } from './serviceAccount';

let createPost = (post, file) => {
  post.userId = serviceAccount.getId();
  const formData = new FormData();
  formData.append("post", JSON.stringify(post));
  formData.append("media", file);
  return Axios.post("/post", formData);
}

let getOnePost = (id) => {
  return Axios.get("post/" + id);
};

let getAllPosts = (post) => {
  return Axios.get("post", post);
};

let modifyPost = (post, file) => {
  post.userId = serviceAccount.getId();
  const formData = new FormData();
  formData.append("post", JSON.stringify(post));
  formData.append("media", file);
  return Axios.put("post/" + post._id, formData);
};

let deletePost = (id) => {
  console.log(id)
  return Axios.delete("post/" + id);
};

export const servicePost = {
    createPost,
    getOnePost,
    getAllPosts,
    modifyPost,
    deletePost
}