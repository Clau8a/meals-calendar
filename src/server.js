import http from "http";
import dotenv from "dotenv";
import { app } from "../app";
dotenv.config();

const port = process.env.PORT;

app.set("port", port);
const server = http.createServer(app);

server.listen(port);

server.on("error", (error) => {
  console.log(error)
  throw error;
});



