/* 
    Create function to initialize socket

    - input: httpServer: initialized server to create socket

    - output: create and return socket
*/

import { Server } from "socket.io";

let io;

const initializeSocket = (httpServer) => {
    const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;
    
    if (!io) {
        io = new Server(httpServer, {
            cors: { 
                origin: socket_url,
                credentials: true,
            },
            transports: ["websocket"],
        });

        io.on("connection", (socket) => {        
            // Log user disconnection
            console.log("User connected");

            // Listen to client send message event
            socket.on("sendMessage", (message) => {
                io.emit("messageReceived", {
                    user: message.user,
                    message: message.message,
                }); // Emit that message to all client
            });

            // Log user disconnection
            socket.on("disconnect", () => {
                console.log("User disconnected!");
            });
        });
    }
    return io;
};

export {initializeSocket};
