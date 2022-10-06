import Api from "./serviceApi";

export default {
    signup(data) {
      return Api().post("auth/signup", data);
    },
    login(data) {
      return Api().post("auth/login", data);
    },
  };