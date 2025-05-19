/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "services/category";

const initialState = {
    status:"loading",
    isLoading:false,
    error:{},
    categories:[],
    isLoadingCreatingCategory:false,
    errorCreatingCategory:{},
    isLoadingGettingCategoryById:false,
    errorGettingCategoryById:{},
    category:{},
    isLoadingUpdatingCategory:false,
    errorUpdatingCategory:{},
    isLoadingDeletingCategory:false,
    errorDeletingCategory:{},

}

export const getAllCategories = createAsyncThunk(
    "category/getAllCategories",
    async (_,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await categoryService.getAllCategories()) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to fetch categories") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to fetch categories")
        }
    }
)

export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (payload:{name:string},{rejectWithValue})=>{
        try {
            const {status,body,message} = (await categoryService.createCategory(payload)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to create category") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to create category")
        }
    }
)

export const getCategoryById = createAsyncThunk(
    "category/getCategoryById",
    async (id:string,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await categoryService.getCategoryById(id)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to fetch category") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to fetch category")
        }
    }
)


export const deleteCategoryId = createAsyncThunk(
    "category/deleteCategoryById",
    async (id:string,{rejectWithValue})=>{
        try {
            const {status,body,message} = (await categoryService.deleteCategoryById(id)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to delete category") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to delete category")
        }
    }
)

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async ({id,data}: {id:string,data:any},{rejectWithValue})=>{
        try {
            const {status,body,message} = (await categoryService.updateCategory(id,data)) as unknown as any
            if(status == 200){
                return body.data
            }
            else{
                return rejectWithValue((message || "Failed to update category") as unknown as any)
            }
        } catch (error) {
            return rejectWithValue((error as unknown as any).message || "Failed to update category")
        }
    }
)


const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllCategories.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllCategories.fulfilled,(state,action)=>{
            state.isLoading = false
            state.categories = action.payload
        })
        .addCase(getAllCategories.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload!;
        })

        .addCase(getCategoryById.pending,(state,)=>{
            state.isLoadingGettingCategoryById = true

        })
        .addCase(getCategoryById.fulfilled,(state,action)=>{
            state.isLoadingGettingCategoryById = false
            state.category = action.payload
        })
        .addCase(getCategoryById.rejected,(state,action)=>{
            state.isLoadingGettingCategoryById = false
            state.errorGettingCategoryById = action.payload!
        })

        .addCase(createCategory.pending,(state)=>{
            state.isLoadingCreatingCategory = true
        })
        .addCase(createCategory.fulfilled,(state,action)=>{
            state.isLoadingCreatingCategory = false
            state.categories = action.payload
        })
        .addCase(createCategory.rejected,(state,action)=>{
            state.isLoadingCreatingCategory = false
            state.errorCreatingCategory = action.payload!
        })

        .addCase(deleteCategoryId.pending,(state)=>{
            state.isLoadingDeletingCategory = true
        })
        .addCase(deleteCategoryId.fulfilled,(state,action)=>{
            state.isLoadingDeletingCategory = false
            state.categories = action.payload
        })
        .addCase(deleteCategoryId.rejected,(state,action)=>{
            state.isLoadingDeletingCategory = false
            state.errorDeletingCategory = action.payload!
        })
        .addCase(updateCategory.pending,(state)=>{
            state.isLoadingUpdatingCategory = true
        })
        .addCase(updateCategory.fulfilled,(state,action)=>{
            state.isLoadingUpdatingCategory = false
            state.categories = action.payload
        })
        .addCase(updateCategory.rejected,(state,action)=>{
            state.isLoadingUpdatingCategory = false
            state.errorUpdatingCategory = action.payload!
        })

    }
})

export default categorySlice.reducer
