-- ============================================================
--  School Management Database Schema
--  Run this script once to set up the MySQL database
-- ============================================================

-- 1. Create (or switch to) the database
CREATE DATABASE IF NOT EXISTS school_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE school_management;

-- 2. Create the schools table
CREATE TABLE IF NOT EXISTS schools (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  address     VARCHAR(500)  NOT NULL,
  latitude    FLOAT(10, 6)  NOT NULL,
  longitude   FLOAT(10, 6)  NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_lat_lng (latitude, longitude)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Seed a few sample schools (optional)
INSERT IGNORE INTO schools (name, address, latitude, longitude) VALUES
  ('Delhi Public School',     'Sector 45, Gurugram, Haryana 122003',   28.4595, 77.0266),
  ('The Shri Ram School',     'Moulsari Avenue, DLF Phase 3, Gurugram', 28.4942, 77.0874),
  ('Ryan International School', 'Sector 40, Gurugram, Haryana 122001', 28.4551, 77.0791),
  ('Heritage School',         'Sector 62, Gurugram, Haryana 122011',   28.4232, 77.0396),
  ('Lotus Valley International', 'Noida, Uttar Pradesh 201301',        28.5244, 77.3910);
