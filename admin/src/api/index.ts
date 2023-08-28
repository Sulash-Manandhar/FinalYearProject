import { ApparelFormSchema } from "@src/schema/apparels";
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

export const deleteUser = async (id: number) => {
  return axios({
    method: "DELETE",
    url: `users/deleteUser/${id}`,
  }).then((res) => res?.data);
};

export const getApparelList = async () => {
  return axios({
    method: "GET",
    url: "/apparels/getApparels",
  }).then((res) => res?.data);
};

export const addApparel = async (data: ApparelFormSchema) => {
  return axios({
    method: "POST",
    url: "/apparels/addApparels",
    data,
  });
};

export const deleteApparel = async (id: number) => {
  return axios({
    method: "DELETE",
    url: `/apparels/deleteApparels/${id}`,
  }).then((res) => res?.data);
};

export const getDrinkwareList = async () => {
  return axios({
    method: "GET",
    url: "/drinkware/getDrinkware",
  }).then((res) => res?.data);
};

export const deleteDrinkware = async (id: number) => {
  return axios({
    method: "DELETE",
    url: `/drinkware/deleteDrinkware/${id}`,
  }).then((res) => res?.data);
};

export const getAccessoriesList = async () => {
  return axios({
    method: "GET",
    url: "/accessories/getAccessories",
  }).then((res) => res.data);
};

export const deleteAccessorie = async (id: number) => {
  return axios({
    method: "DELETE",
    url: `/accessories/deleteAccessories/${id}`,
  }).then((res) => res.data);
};

export const addFile = async (data: FormData) => {
  return axios({
    method: "POST",
    url: "/uploads",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res?.data);
};
