import express from "express";
import authRoutes from "./auth.route";
import agencyRoutes from "./agency.route";
import categoryRoutes from "./category.route";
import complaintRoutes from "./complaint.route";
import responseRoutes from "./complaint-response.route";
const app = express();


app.use("/auth", authRoutes);
app.use("/agency", agencyRoutes);
app.use("/category", categoryRoutes);
app.use("/complaint", complaintRoutes);
app.use("/response", responseRoutes);

export default app;