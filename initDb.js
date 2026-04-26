const { getSchoolsCollection } = require("./database");

const initializeDatabase = async () => {
  try {
    const schools = getSchoolsCollection();

    await schools.createIndex(
      { name: 1, address: 1 },
      { unique: true, name: "idx_unique_name_address" }
    );

    await schools.createIndex(
      { location: "2dsphere" },
      { name: "idx_location_2dsphere" }
    );

    console.log("✅ MongoDB collections and indexes are ready");
  } catch (error) {
    console.error("❌ Failed to initialize database:", error.message);
    throw error;
  }
};

module.exports = { initializeDatabase };
