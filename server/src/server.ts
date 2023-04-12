import http from "http";
import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server is running at ${PORT}`));
