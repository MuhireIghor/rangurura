import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth"
import ui from "./ui"
import complaint from "./complaint";
import agency from "./agency";
import complaintResponse from "./complaintResponse"
import category from "./category";
const rootReducer = combineReducers({
    auth,
    ui,
    complaint,
    agency,
    complaintResponse,
    category
    
})
export default rootReducer;