/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import responseService from "services/response";
import { CreateComplaintResponseDto } from "../../../types/request/response.dto";

const initialState = {
    
    allComplaintResponses:[],
    isLoadingAllComplaintResponses:false,
    errorAllComplaintResponses:{},
    allResponsesByStaffId:[],
    isLoadingAllResponsesByStaffId:false,
    errorAllResponsesByStaffId:{},
    allResponsesByComplaintId:[],
    isLoadingAllResponsesByComplaintId:false,
    errorAllResponsesByComplaintId:{},
    status:"loading",
    isLoadingResponseById:false,
    errorResponseById:{},
    isLoadingUpdateResponse:false,
    errorUpdateResponse:{},
    isLoadingGetResponseByStaffId:false,
    errorGetResponseByStaffId:{},
    isLoadingGetResponseByComplaintId:false,
    errorGetResponseByComplaintId:{},
    responseById:{},
    

    
}

export const getAllComplaintResponses = createAsyncThunk(
    "complaintResponse/getAllComplaintResponses",
    async (_,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await responseService.getAllResponses()) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to fetch responses") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to fetch responses")
        }
    }
)

export const createResponse = createAsyncThunk(
    "complaintResponse/createResponse",
    async (payload:CreateComplaintResponseDto,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await responseService.createResponse(payload)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to create response") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to create response")
        }
    }
)

export const getResponseById = createAsyncThunk(
    "complaintResponse/getResponseById",
    async (id:string,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await responseService.getResponseById(id)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to fetch response") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to fetch response")
        }
    }
)

export const updateResponse = createAsyncThunk(
    "complaintResponse/updateResponse",
    async ({id,payload}: {id:string,payload:CreateComplaintResponseDto},{rejectWithValue})=>{
        try {
            const {status,body,message} = (await responseService.updateResponse(id,payload)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to update response") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to update response")
        }
    }
)

export const getResponseByStaffId = createAsyncThunk(
    "complaintResponse/getResponseByStaffId",
    async (id:string,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await responseService.getResponseByStaffId(id)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to fetch response") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to fetch response")
        }
    }
)

export const getResponseByComplaintId = createAsyncThunk(
    "complaintResponse/getResponseByComplaintId",
    async (id:string,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await responseService.getResponseByComplaintId(id)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to fetch response") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to fetch response")
        }
    }
)


const complaintResponseSlice = createSlice({
    name:"complaintResponse",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(
            getAllComplaintResponses.pending,(state)=>{
                state.isLoadingAllComplaintResponses = true;
                state.status = "loading";
            }
        )
        .addCase(
            getAllComplaintResponses.fulfilled,(state,action)=>{
                state.isLoadingAllComplaintResponses = false;
                state.status = "success";
                state.allComplaintResponses = action.payload;
            }
        )
        .addCase(
            getAllComplaintResponses.rejected,(state,action)=>{
                state.isLoadingAllComplaintResponses = false;
                state.status = "error";
                state.errorAllComplaintResponses = action.payload!;
            }
        )
        .addCase(
            getResponseById.pending,(state)=>{
                state.isLoadingResponseById = true;
                state.status = "loading";
            }
        )
        .addCase(
            getResponseById.fulfilled,(state,action)=>{
                state.isLoadingResponseById = false;
                state.status = "success";
                state.responseById = action.payload;
            }
        )
        .addCase(
            getResponseById.rejected,(state,action)=>{
                state.isLoadingResponseById = false;
                state.status = "error";
                state.errorResponseById = action.payload!;
            }
        )
        .addCase(
            createResponse.pending,(state)=>{
                state.isLoadingResponseById = true;
                state.status = "loading";
            }
        )
        .addCase(
            createResponse.fulfilled,(state,action)=>{
                state.isLoadingResponseById = false;
                state.status = "success";
                state.responseById = action.payload;
            }
        )
        .addCase(
            createResponse.rejected,(state,action)=>{
                state.isLoadingResponseById = false;
                state.status = "error";
                state.errorResponseById = action.payload!;
            }
        )
   


    }
})

export default complaintResponseSlice.reducer
