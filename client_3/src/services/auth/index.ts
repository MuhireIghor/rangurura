import { AgencyStaffUserDto, LoginDto, UserDto } from "../../types/request/user.dto";
import http from "../https"

const signup = (payload:UserDto)=>{
    return http.post("/auth/signup",payload);
}
const login = (payload:LoginDto)=>{
    return http.post("/auth/login",payload);
}

const signUpAgency = (payload:AgencyStaffUserDto)=>{
    return http.post(`/auth/signup/agencyStaff`,payload);
}
const getAllUsers = ()=>{
    return http.get(`/auth/all`);
}

const getUserProfile = (email:string)=>{
    return http.get(`/auth/profile/${email}`);
}

export default {
    signup,
    login,
    signUpAgency,
    getAllUsers,
    getUserProfile
}