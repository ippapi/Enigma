/* 
    Create http server to handle socket
*/

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
    // Ensure connected to database
    await dbConnect();

    // Initialize server
    const httpServer = createServer(handler);

    // Initialize socket
    initializeSocket(httpServer);

    // Notify server status
    httpServer.listen(port, () => {
        console.log(`Server running on http://${hostname}:${port}`);
    });
});