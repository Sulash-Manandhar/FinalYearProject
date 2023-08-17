import { Binary } from "..";

export interface UserDetail {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  district: string;
  province: number;
  ban: Binary;
  verified: Binary;
}
