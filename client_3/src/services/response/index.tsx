import http from "../https";
import { CreateComplaintResponseDto } from "../../types/request/response.dto";

const createResponse = (payload:CreateComplaintResponseDto)=>{
    return http.post(`/response/${payload.complaintId}/respond`,payload);
}

const getAllResponses = ()=>{
    return http.get(`/response/all`);
}

const getResponseById = (id:string)=>{
    return http.get(`/response/${id}`);
}

const updateResponse = (id:string,payload:CreateComplaintResponseDto)=>{
    return http.put(`/response/${id}`,payload);
}
const getResponseByStaffId = (id:string)=>{
    return http.get(`/response/by-staff/${id}`);
}

const getResponseByComplaintId = (id:string)=>{
    return http.get(`/response/by-complaint/${id}`);
}


export default {
    createResponse,
    getAllResponses,
    getResponseById,
    updateResponse,
    getResponseByStaffId,
    getResponseByComplaintId
}
