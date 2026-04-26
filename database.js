const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "school_management";

let client;
let db;

const connectDatabase = async () => {
  if (db) {
    return db;
  }

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set in .env");
  }

  client = new MongoClient(mongoUri);
  await client.connect();
  db = client.db(dbName);
  return db;
};

// Test connection on startup
const testConnection = async () => {
  try {
    const database = await connectDatabase();
    await database.command({ ping: 1 });
    console.log("✅ MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized. Call testConnection() first.");
  }
  return db;
};

const getSchoolsCollection = () => getDb().collection("schools");

module.exports = {
  connectDatabase,
  testConnection,
  getDb,
  getSchoolsCollection,
};
