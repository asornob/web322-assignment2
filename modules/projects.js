const fs = require("fs");
const path = require("path");

function getAllProjects() {
  try {
    const filePath = path.resolve("./data/sectorData.json"); // ✅ works on Vercel + local
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading sectorData.json:", err);
    return [];
  }
}

function getProjectsBySector(sector) {
  try {
    const projects = getAllProjects();
    return projects.filter(
      (proj) => proj.sector.toLowerCase() === sector.toLowerCase()
    );
  } catch (err) {
    console.error("Error filtering projects by sector:", err);
    return [];
  }
}

function getProjectById(id) {
  try {
    const projects = getAllProjects();
    return projects.find((proj) => proj.id == id);
  } catch (err) {
    console.error("Error getting project by ID:", err);
    return null;
  }
}

module.exports = {
  getAllProjects,
  getProjectsBySector,
  getProjectById,
};
