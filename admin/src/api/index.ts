import axios from "axios";

axios.defaults.baseURL = "http://localhost:4600";

export const getUserList = async () => {
  return axios({
    method: "GET",
    url: "/users/getUsers",
  }).then((res) => res?.data);
};

export const toggleUserVerification = async (data: any) => {
  return axios({
    method: "POST",
    url: "/users/toggleUserVerification",
    data,
  }).then((response) => response?.data);
};

export const toggleUserBan = async (data: any) => {
  return axios({
    method: "PUT",
    url: "users/banUser",
    data,
  }).then((res) => res?.data);
};
