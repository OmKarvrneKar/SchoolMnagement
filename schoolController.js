const { getSchoolsCollection } = require("./database");

// ─── Add School ───────────────────────────────────────────────────────────────
/**
 * POST /addSchool
 * Body: { name, address, latitude, longitude }
 */
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    const schools = getSchoolsCollection();

    const newSchool = {
      name: name.trim(),
      address: address.trim(),
      latitude: lat,
      longitude: lon,
      location: {
        type: "Point",
        coordinates: [lon, lat],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await schools.insertOne(newSchool);

    return res.status(201).json({
      success: true,
      message: "School added successfully",
      data: {
        id: result.insertedId.toString(),
        name: newSchool.name,
        address: newSchool.address,
        latitude: lat,
        longitude: lon,
      },
    });
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A school with the same name and address already exists.",
      });
    }

    console.error("addSchool error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// ─── List Schools ─────────────────────────────────────────────────────────────
/**
 * GET /listSchools?latitude=<lat>&longitude=<lon>
 */
const listSchools = async (req, res) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    const schools = getSchoolsCollection();

    const schoolsWithDistance = await schools
      .aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [userLon, userLat],
            },
            distanceField: "distance_m",
            spherical: true,
          },
        },
        {
          $project: {
            name: 1,
            address: 1,
            latitude: 1,
            longitude: 1,
            distance_km: {
              $round: [{ $divide: ["$distance_m", 1000] }, 4],
            },
          },
        },
      ])
      .toArray();

    if (schoolsWithDistance.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No schools found in the database.",
        data: [],
        total: 0,
        userLocation: { latitude: userLat, longitude: userLon },
      });
    }

    const formattedSchools = schoolsWithDistance.map((school) => ({
      id: school._id.toString(),
      name: school.name,
      address: school.address,
      latitude: school.latitude,
      longitude: school.longitude,
      distance_km: school.distance_km,
    }));

    return res.status(200).json({
      success: true,
      message: "Schools fetched and sorted by proximity successfully",
      data: formattedSchools,
      total: formattedSchools.length,
      userLocation: { latitude: userLat, longitude: userLon },
    });
  } catch (error) {
    console.error("listSchools error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

module.exports = { addSchool, listSchools };
