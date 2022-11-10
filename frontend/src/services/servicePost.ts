import groupomaniaApi from './serviceApi';
import { serviceAccount } from './serviceAccount';

let createPost = (post, file) => {
  post.userId = serviceAccount.getId();
  const formData = new FormData();
  formData.append("post", JSON.stringify(post));
  formData.append("media", file);
  return groupomaniaApi().post("/post", formData);
}

let getOnePost = (id) => {
  return groupomaniaApi().get("post/" + id);
};

let getAllPosts = () => {
  return groupomaniaApi().get("post");
};

let modifyPost = (post, file) => {
  post.userId = serviceAccount.getId();
  const formData = new FormData();
  formData.append("post", JSON.stringify(post));
  formData.append("media", file);
  return groupomaniaApi().put("post/" + post._id, formData);
};

let deletePost = (id) => {
  console.log(id)
  return groupomaniaApi().delete("post/" + id);
};

export const servicePost = {
    createPost,
    getOnePost,
    getAllPosts,
    modifyPost,
    deletePost
}