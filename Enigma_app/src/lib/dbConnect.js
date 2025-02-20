import mongoose from "mongoose";

// Prepare connection info
const MONGO_URI = process.env.MONGO_URI;

if(!MONGO_URI){
    throw new Error("Contact Phong Vu for MONGO_URI");
}

let cached = global.mongoose || {conn: null, promise: null};

// Connect to db async function
const dbConnect = async () => {
    // Reuse cached connection
    if(cached.conn)
        return cached.conn;

    // Create connection with only one connection promise
    if(!cached.promise){
        // Establish a connection promise
        cached.promise = mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,
        }).then((mongoose) => mongoose); // Return connection promise
    }

    // Wait for connection before return
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;