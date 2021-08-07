import cors from "cors";

export const corsOptions: cors.CorsOptions = {
  methods: ["GET", "POST", "DELETE", "PATCH"],
  origin: "*",
};
