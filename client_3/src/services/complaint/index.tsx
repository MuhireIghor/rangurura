import { ComplaintDto } from "../../types/request/complaint.dto";
import http from "../https";



const createComplaint = (payload:ComplaintDto)=>{
    return http.post("/complaint",payload);
}

const getUserComplaints = (userId:string)=>{
    return http.get(`/complaint/all-complaints-by-user/${userId}`);
}
const getAllSystemComplaints = ()=>{
    return http.get(`/complaint/all`);
}

const getComplaintById = (id:string)=>{
    return http.get(`/complaint/all-complaints/${id}`);
}

const updateComplaint = (id:string,payload:ComplaintDto)=>{
    return http.put(`/complaint/${id}`,payload);
}

const escalateComplaint = (id:string)=>{
    return http.put(`/complaint/escalate/${id}`);
}
const markAsUnderReview = (id:string)=>{
    return http.put(`/complaint/mark-as-under-review/${id}`);
}
const markAsResolved = (id:number)=>{
    return http.put(`/complaint/mark-as-resolved/${id}`);
}



export default {
    createComplaint,
    getUserComplaints,
    getComplaintById,
    updateComplaint,
    escalateComplaint,
    getAllSystemComplaints,
    markAsUnderReview,
    markAsResolved
}
