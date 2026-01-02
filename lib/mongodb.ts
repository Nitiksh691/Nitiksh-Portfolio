import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    // Collect all possible keys and log them to help debug
    const keys = Object.keys(process.env);
    const mongoKeys = keys.filter(k => k.toLowerCase().includes("mongo"));

    // Pick the first available connection string from any common Mongo key
    const MONGODB_URI = process.env.MONGODB_URI ||
        process.env.MONGODB_URL ||
        process.env.MONGO_URL ||
        process.env.MONGO_URI ||
        "";

    if (!MONGODB_URI) {
<<<<<<< HEAD
        console.error("❌ MONGODB CONNECTION ERROR: No URI found in environment variables.");
        console.log("Found these Mongo-related keys in process.env:", mongoKeys);

=======
>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2
        throw new Error("MONGODB_URI is not defined. IMPORTANT: If you just added it to .env, you MUST restart your terminal (pnpm dev) for Next.js to see it.");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

<<<<<<< HEAD
        console.log("🔄 Attempting to connect to MongoDB...");
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("✅ MongoDB connected successfully");
=======
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2
            return mongoose;
        }).catch(err => {
            console.error("❌ MongoDB connection failed:", err.message);
            cached.promise = null;
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;

