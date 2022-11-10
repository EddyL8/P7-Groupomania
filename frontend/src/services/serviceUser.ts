import groupomaniaApi from "./serviceApi";
import { serviceAccount }  from './serviceAccount'

let createUser = (user) => {
  return groupomaniaApi().post("auth/signup", user);
};

let loginUser = async (user) => {
  return groupomaniaApi().post("/auth/login", user)
  .then(res => {
    serviceAccount.saveToken(res.data.token)
    serviceAccount.saveId(res.data.userId)
    serviceAccount.saveAdminStatus(res.data.isAdmin)
  })
};

let getUser = () => {
  return groupomaniaApi().get("user/");
};

let getAllUsers = () => {
  return groupomaniaApi().get("auth/users");
};

let updateUser = (user) => {
 return groupomaniaApi().patch("auth/user/"+ user.id, user);
};

let deleteUser = (id) => {
  return groupomaniaApi().delete("/auth/user/"+id)
}
export const serviceUser = {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};