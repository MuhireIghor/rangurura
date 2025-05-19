/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import complaintService from "services/complaint"
import { ComplaintDto } from "../../../types/request/complaint.dto";

const initialState = {
    isLoadingAllUserComplaints:false,
    isLoadingAllSystemComplaints:false,
    status:"loading",
    allUserComplaints:[],
    allSystemComplaints:[],
    errorLoadingAllUserComplaints:{},
    isCreatingNewComplaint:false,
    errorCreatingNewComplaint:{},
    isUpdatingComplaintStatus:false,
    errorUpdatingComplaintStatus:{},
    isEscalatingComplaint:false,
    errorEscalatingComplaint:{},
    errorLoadingAllSystemComplaints:{},
    isMarkingAsUnderReview:false,
    errorMarkingAsUnderReview:{},
    isMarkingAsResolved:false,
    errorMarkingAsResolved:{},
    
}

export const getAllUserComplaints = createAsyncThunk(
    "complaint/getAllUserComplaints",
    async (userId:string,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await complaintService.getUserComplaints(userId)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to fetch complaints") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to fetch complaints")
        }
    }
)

export const createNewComplaint = createAsyncThunk(
    "complaint/createNewComplaint",
    async (complaintData:ComplaintDto,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await complaintService.createComplaint(complaintData)) as unknown as any
            if(status == 201){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to create complaint") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to create complaint")
        }
    }
)

export const updateComplaintStatus = createAsyncThunk(
    "complaint/updateComplaintStatus",
    async ({id,complaintData}: {id:string,complaintData:ComplaintDto},{rejectWithValue})=>{
        try {
            const {status,body,message} = (await complaintService.updateComplaint(id,complaintData)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to update complaint status") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to update complaint status")
        }
    }
)

export const escalateComplaint = createAsyncThunk(
    "complaint/escalateComplaint",
    async (id:string,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await complaintService.escalateComplaint(id)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to escalate complaint") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to escalate complaint")
        }
    }
)

export const getAllSystemComplaints = createAsyncThunk(
    "complaint/getAllSystemComplaints",
    async (_,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await complaintService.getAllSystemComplaints()) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to fetch complaints") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to fetch complaints")
        }
    }
)

export const markComplaintAsUnderReview = createAsyncThunk(
    "complaint/markComplaintAsUnderReview",
    async (id:string,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await complaintService.markAsUnderReview(id)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to mark complaint as under review") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to mark complaint as under review")
        }
    }
)

export const markComplaintAsResolved = createAsyncThunk(
    "response/markComplaintAsResolved",
    async (id:number,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await complaintService.markAsResolved(parseInt(id))) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to mark complaint as resolved") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to mark complaint as resolved")
        }
    }
)

const complaintSlice = createSlice({
    name:"complaint",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getAllUserComplaints.pending,(state)=>{
            state.isLoadingAllUserComplaints = true;
            state.status = "loading";
        })
        .addCase(getAllUserComplaints.fulfilled,(state,action)=>{
            state.isLoadingAllUserComplaints = false;
            state.status = "success";
            state.allUserComplaints = action.payload;
        })
        .addCase(getAllUserComplaints.rejected,(state,action)=>{
            state.isLoadingAllUserComplaints = false;
            state.status = "error";
            state.errorLoadingAllUserComplaints = action.payload!;
        })

        .addCase(createNewComplaint.pending,(state)=>{
            state.isCreatingNewComplaint = true;
            state.status = "loading";
        })
        .addCase(createNewComplaint.fulfilled,(state,action)=>{
            state.isCreatingNewComplaint = false;
            state.status = "success";
        })
        .addCase(createNewComplaint.rejected,(state,action)=>{
            state.isCreatingNewComplaint = false;
            state.status = "error";
            state.errorCreatingNewComplaint = action.payload!;
        })

        .addCase(updateComplaintStatus.pending,(state)=>{
            state.isUpdatingComplaintStatus = true;
            state.status = "loading";
        })
        .addCase(updateComplaintStatus.fulfilled,(state)=>{
            state.isUpdatingComplaintStatus = false;
            state.status = "success";
        })
        .addCase(updateComplaintStatus.rejected,(state,action)=>{
            state.isUpdatingComplaintStatus = false;
            state.status = "error";
            state.errorUpdatingComplaintStatus = action.payload!;
        })
        .addCase(escalateComplaint.pending,(state)=>{
            state.isEscalatingComplaint = true;
            state.status = "loading";
        })
        .addCase(escalateComplaint.fulfilled,(state)=>{
            state.isEscalatingComplaint = false;
            state.status = "success";
        })
        .addCase(escalateComplaint.rejected,(state,action)=>{
            state.isEscalatingComplaint = false;
            state.status = "error";
            state.errorEscalatingComplaint = action.payload!;
        })
        .addCase(getAllSystemComplaints.pending,(state)=>{
            state.isLoadingAllSystemComplaints = true;
            state.status = "loading";
        })
        .addCase(getAllSystemComplaints.fulfilled,(state,action)=>{
            state.isLoadingAllSystemComplaints = false;
            state.status = "success";
            state.allSystemComplaints = action.payload;
        })
        .addCase(getAllSystemComplaints.rejected,(state,action)=>{
            state.isLoadingAllSystemComplaints = false;
            state.status = "error";
            state.errorLoadingAllSystemComplaints = action.payload!;
        })
        .addCase(markComplaintAsUnderReview.pending,(state)=>{
            state.isMarkingAsUnderReview = true;
            state.status = "loading";
        })
        .addCase(markComplaintAsUnderReview.fulfilled,(state)=>{
            state.isMarkingAsUnderReview = false;
            state.status = "success";
        })
        .addCase(markComplaintAsUnderReview.rejected,(state,action)=>{
            state.isMarkingAsUnderReview = false;
            state.status = "error";
            state.errorMarkingAsUnderReview = action.payload!;
        })
        .addCase(markComplaintAsResolved.pending,(state)=>{
            state.isMarkingAsResolved = true;
            state.status = "loading";
        })
        .addCase(markComplaintAsResolved.fulfilled,(state)=>{
            state.isMarkingAsResolved = false;
            state.status = "success";
        })
        .addCase(markComplaintAsResolved.rejected,(state,action)=>{
            state.isMarkingAsResolved = false;
            state.status = "error";
            state.errorMarkingAsResolved = action.payload!;
        })



    }
})
export default complaintSlice.reducer