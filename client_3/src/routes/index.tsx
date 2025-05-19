import { lazy } from "react";
import { AuthRoute, PublicRoute } from "./router";
import { Route, Routes } from "react-router-dom";
import useAutoLogout from "hooks/useAutoLogout";
import NotFound from "app/404";

const AppRoutes = () => {
    useAutoLogout();
    return (
        <>
            <Routes>

                <Route path="/" element={<PublicRoute component={lazy(() => import("../app/Home/Home"))} />} />
                {/* ====================================AUTH ROUTES =================================================== */}
                <Route path="auth/signup" element={<PublicRoute component={lazy(() => import("../app/Auth/Register"))} />} />
                <Route path="auth/login" element={<PublicRoute component={lazy(() => import("../app/Auth/Login"))} />} />
                {/* ======================= END OF AUTH ROUTES ============================ */}

                {/* ======================= ON-BOARD ROUTES ============================ */}
                <Route path="on-board" element={<PublicRoute component={lazy(() => import("../app/Home/Onboarding"))} />} />
                {/* ======================= END OF ON-BOARD ROUTES ============================ */}
                {/* ======================= Citizen ROUTES ============================ */}
                <Route path="citizen/dashboard" element={<AuthRoute allowedRoles={["CITIZEN"]} component={lazy(() => import("../app/Citizen/Dashboard"))} />} />
                <Route path="citizen/complaints/new" element={<AuthRoute allowedRoles={["CITIZEN"]} component={lazy(() => import("../app/Citizen/Complaints/New"))} />} />
                <Route path="citizen/complaints" element={<AuthRoute allowedRoles={["CITIZEN"]} component={lazy(() => import("../app/Citizen/Complaints"))} />} />
                <Route path="citizen/profile" element={<AuthRoute allowedRoles={["CITIZEN"]} component={lazy(() => import("../app/Citizen/Profile"))} />} />
                {/* ======================= END OF Citizen ROUTES ============================ */}
                {/* ======================= Admin ROUTES ============================ */}
                <Route path="admin/dashboard" element={<AuthRoute allowedRoles={["ADMIN","AGENCY_STAFF"]} component={lazy(() => import("../app/Admin/Dashboard"))} />} />
                <Route path="admin/complaints" element={<AuthRoute allowedRoles={["ADMIN","AGENCY_STAFF"]} component={lazy(() => import("../app/Admin/Complaints"))} />} />
                <Route path="admin/users" element={<AuthRoute allowedRoles={["ADMIN","AGENCY_STAFF"]} component={lazy(() => import("../app/Admin/Users"))} />} />
                <Route path="admin/profile" element={<AuthRoute allowedRoles={["ADMIN","AGENCY_STAFF"]} component={lazy(() => import("../app/Admin/Profile"))} />} />
                <Route path="admin/agency" element={<AuthRoute allowedRoles={["ADMIN","AGENCY_STAFF"]} component={lazy(() => import("../app/Admin/Agency"))} />} />
                <Route path="admin/category" element={<AuthRoute allowedRoles={["ADMIN","AGENCY_STAFF"]} component={lazy(() => import("../app/Admin/Category"))} />} />
                {/* ======================= END OF Admin ROUTES ============================ */}
                <Route path="/*" element={<NotFound />} />


            </Routes>

        </>
    )

}
export default AppRoutes;