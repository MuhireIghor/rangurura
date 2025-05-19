import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth"
import ui from "./ui"
import complaint from "./complaint";
const rootReducer = combineReducers({
    auth,
    ui,
    complaint
})
export default rootReducer;