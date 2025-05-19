/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/slices/agency.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agencyService from "../../../services/agency";


const initialState = {
  agencies: [],
  loading: false,
  error: {},
  isLoadingCreatingAgency: false,
  errorCreatingAgency: {},
  isLoadingGettingAgencyById: false,
  errorGettingAgencyById: {},
  agency: {},
  isLoadingUpdatingAgency: false,
  errorUpdatingAgency: {},
  isLoadingDeletingAgency: false,
  errorDeletingAgency: {},
};

export const getAllAgencies = createAsyncThunk(
  "agency/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const {status, body, message} = (await agencyService.getAllAgencies()) as unknown as any;
      if(status == 200){
        return body.data;
      }
      return rejectWithValue(message || "Failed to fetch agencies");
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch agencies");
    }
  }
);

export const createAgency = createAsyncThunk(
  "agency/create",
  async (data:any, { rejectWithValue }) => {
    try {
      const {status, body, message} = (await agencyService.createAgency(data)) as unknown as any;
      if(status == 201){
        return body.data;
      }
      return rejectWithValue(message || "Failed to create agency");
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create agency");
    }
  }
);

export const getAgencyById = createAsyncThunk(
    "agency/getById",
    async (id:number, { rejectWithValue }) => {
      try {
        const {status, body, message} = (await agencyService.getAgencyById(id)) as unknown as any;
        if(status == 200){
          return body.data;
        }
        return rejectWithValue(message || "Failed to fetch agency");
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch agency");
      }
    }
  );

export const updateAgency = createAsyncThunk(
    "agency/update",
    async ({id,data}: {id:number,data:any}, { rejectWithValue }) => {
      console.log(id,data)
      try {
        const {status, body, message} = (await agencyService.updateAgency(id,data)) as unknown as any;
        if(status == 200){
          return body.data;
        }
        return rejectWithValue(message || "Failed to update agency");
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to update agency");
      }
    }
  );

export const deleteAgency = createAsyncThunk(
    "agency/delete",
    async (id:number, { rejectWithValue }) => {
      try {
        const {status, body, message} = (await agencyService.deleteAgency(id)) as unknown as any;
        if(status == 200){
          return body.data;
        }
        return rejectWithValue(message || "Failed to delete agency");
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete agency");
      }
    }
  );


const agencySlice = createSlice({
  name: "agency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllAgencies.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAllAgencies.fulfilled, (state, action) => {
      state.loading = false;
      state.agencies = action.payload;
    })
    .addCase(getAllAgencies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload!;
    })
    .addCase(createAgency.pending, (state) => {
      state.isLoadingCreatingAgency = true;
    })
    
    .addCase(createAgency.fulfilled, (state) => {
      state.isLoadingCreatingAgency = false;
    })
    .addCase(createAgency.rejected, (state, action) => {
      state.isLoadingCreatingAgency = false;
      state.errorCreatingAgency = action.payload!;
    })
    .addCase(getAgencyById.fulfilled, (state, action) => {
      state.isLoadingGettingAgencyById = false;
      state.agency = action.payload;
    })
    .addCase(getAgencyById.rejected, (state, action) => {
      state.isLoadingGettingAgencyById = false;
      state.errorGettingAgencyById = action.payload!;
    })
    .addCase(getAgencyById.pending, (state) => {
      state.isLoadingGettingAgencyById = true;
    })
    .addCase(updateAgency.pending, (state) => {
      state.isLoadingUpdatingAgency = true;
    })
    .addCase(updateAgency.fulfilled, (state) => {
      state.isLoadingUpdatingAgency = false;
    })
    .addCase(updateAgency.rejected, (state, action) => {
      state.isLoadingUpdatingAgency = false;
      state.errorUpdatingAgency = action.payload!;
    })
    .addCase(deleteAgency.pending, (state) => {
      state.isLoadingDeletingAgency = true;
    })
    .addCase(deleteAgency.fulfilled, (state) => {
      state.isLoadingDeletingAgency = false;
    })
    .addCase(deleteAgency.rejected, (state, action) => {
      state.isLoadingDeletingAgency = false;
      state.errorDeletingAgency = action.payload!;
    })


  },
});

export default agencySlice.reducer;