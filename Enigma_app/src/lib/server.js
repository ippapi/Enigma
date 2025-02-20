import "dotenv/config";
import { createServer } from "http";
import next from "next";
import dbConnect from "./dbConnect.js";
import { initializeSocket } from "./socket.js";

// Prepare server info
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(async () => {
  await dbConnect(); // Connect to database
  const httpServer = createServer(handler); // Initialize server

  initializeSocket(httpServer); // Initialize socket

  // Notify server status
  httpServer.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  });
});