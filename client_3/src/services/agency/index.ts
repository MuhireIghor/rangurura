/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "../https";

const getAllAgencies = () => http.get("/agency");
const createAgency = (data: any) => http.post("/agency", data);
const getAgencyById = (id:number)=>http.get(`/agency/${id}`);
const updateAgency = (id:number,data:any)=>http.put(`/agency/${id}`,data);
const deleteAgency = (id:number)=>http.delete(`/agency/${id}`);

export default {
    getAllAgencies,
    createAgency,
    getAgencyById,
    updateAgency,
    deleteAgency

}