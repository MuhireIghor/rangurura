/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "../https";

const createCategory = (payload: any)=>{
    return http.post("/category",payload);
}

const getAllCategories = ()=>{
    return http.get("/category/all");
}

const updateCategory = (id:string,payload:any)=>{
    return http.put(`/category/${id}`,payload);
}

const getCategoryById = (id:string)=>{
    return http.get(`/category/all-categories/${id}`)
}

const deleteCategoryById = (id:string)=>{
    return http.delete(`/category/${id}`)
}

export default {
    createCategory,
    getAllCategories,
    updateCategory,
    getCategoryById,
    deleteCategoryById
}
