import { Server } from "socket.io";

let io;

const initializeSocket = (httpServer) => {
    if (!io) {
        io = new Server(httpServer, {
            cors: { origin: "*" },
            transports: ["websocket"],
        });

        io.on("connection", (socket) => {
            // Log user connection
            console.log("User connected:", socket.id);

            // Listen to client send message event
            socket.on("sendMessage", (message) => {
                io.emit("messageReceived", message); // Emit that message to all client
            });

            // Loc user disconnection
            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });
        });
    }
    return io;
};

export {initializeSocket};
