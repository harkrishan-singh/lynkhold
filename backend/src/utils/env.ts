import dotenv from "dotenv";

// Load environment variables from the .env file into process.env
dotenv.config();

// The 'as string' is a TypeScript type assertion to ensure it's treated as a string

// Export the port number the server should listen on from environment variables
export const PORT = process.env.PORT as string;

// Export the MongoDB connection URI from environment variables
export const MONGO_URI = process.env.MONGO_URI as string;

// Export the JWT secret key for signing tokens from environment variables
export const JWT_SECRET = process.env.JWT_SECRET as string;
