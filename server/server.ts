import express from "express";
import privacyRoutes from "./routes/privacy.routes";

const app = express();

app.use(express.json());

app.use("/api", privacyRoutes);

app.listen(4000, () => {
  console.log("server started");
});
