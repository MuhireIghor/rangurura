/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "services/auth"
import { LoginDto, UserDto, AgencyStaffUserDto } from "../../../types/request/user.dto";
import { storeData } from "utils";
import { authKeyName } from "constants/main";
const initialState = {
  isLoading: false,
  status: "loading",
  user: null,
  profile: {},
  error: {},
  loadingAllUsers:false,
  errorLoadingAllUsers:{},
  allUsers:[]

}


export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (payload: UserDto, { rejectWithValue }) => {
    try {
      const { status, body, message } = (await authService.signup(payload)) as unknown as any;
      if (status == 201) {
        const token = body?.data;
        storeData(authKeyName, token, true, true);
        window.location.replace("/auth/login");

      }
      else {
        return rejectWithValue((message || "Something went wrong") as unknown as any);
      }


    } catch (error) {
      return rejectWithValue((error as unknown as any).message);
    }
  }
);

export const signupAgencyUser = createAsyncThunk(
  "auth/signupAgencyUser",
  async (payload: AgencyStaffUserDto, { rejectWithValue }) => {
    try {
      const { status, body, message } = (await authService.signUpAgency(payload)) as unknown as any;
      if (status == 201) {
        const token = body?.data;
        storeData(authKeyName, token, true, true);
        window.location.replace("/auth/login");

      }
      else {
        return rejectWithValue((message || "Something went wrong") as unknown as any);
      }


    } catch (error) {
      return rejectWithValue((error as unknown as any).message);
    }
  }
)


export const loginUser = createAsyncThunk(
  "auth/loginuser",
  async (payload: LoginDto, { rejectWithValue }) => {
    try {
      const { status, body, message } = (await authService.login(payload)) as unknown as any;
      if (status == 200) {
        const token = body?.data?.token;
        storeData(authKeyName, token, true, true);
        const user = body?.data?.user;
        
        window.location.replace(user?.role === "CITIZEN" ? "/citizen/dashboard" : "/admin/dashboard");

      }
      else {
        return rejectWithValue((message || "Something went wrong") as unknown as any);
      }


    } catch (error) {
      return rejectWithValue((error as unknown as any).message);
    }
  }
);

// export const getUserProfile = createAsyncThunk(
//   "auth/getuserprofile",
//   async (payload: string, { rejectWithValue }) => {
//     try {
//       const { body, status, message } = (await authService.getUserProfile(payload)) as unknown as any;
//       if (status == 200) {
//         const response = {
//           firstName: body.data.firstname,
//           lastName: body.data.lastname,
//           email: body.data.email,
//           phoneNumber: body.data.phoneNumber,
//           role: body.data.role,
//         }
//         return response;
//       }
//       else {
//         return rejectWithValue((message || "Something went wrong") as unknown as any);
//       }


//     }
//     catch (error) {
//       return rejectWithValue((error as unknown as any).message);
//     }

//   }
// )

export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async (_,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await authService.getAllUsers()) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to fetch users") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to fetch users")
        }
    }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";

      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.user = action.payload!;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "error";
        state.error = action.payload!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";

      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.user = action.payload!;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "error";
        state.error = action.payload!;
      })
      .addCase(signupAgencyUser.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(signupAgencyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.user = action.payload!;
      })
      .addCase(signupAgencyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "error";
        state.error = action.payload!;
      })
      .addCase(getAllUsers.pending,(state)=>{
        state.loadingAllUsers = true;
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled,(state,action)=>{
        state.loadingAllUsers = false;
        state.status = "success";
        state.allUsers = action.payload!;
      })
      .addCase(getAllUsers.rejected,(state,action)=>{
        state.loadingAllUsers = false;
        state.status = "error";
        state.errorLoadingAllUsers = action.payload!;
      })

      // .addCase(getUserProfile.pending, (state) => {
      //   state.isLoading = true;
      //   state.status = "loading";
      //   state.profile = {};
      // })
      // .addCase(getUserProfile.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.status = "error";
      //   state.error = action.payload!;
      // })
      // .addCase(getUserProfile.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.status = "success";
      //   state.profile = action.payload!;
      // })

  }

})
export default authSlice.reducer;