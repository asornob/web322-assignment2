const fs = require("fs");
const path = require("path");

let projects = [];

// ✅ Absolute path works on your system
const filePath = path.join(
  "C:",
  "Users",
  "xvert",
  "Desktop",
  "web322-assignment2",
  "data",
  "sectorData.json"
);

// ✅ Initialize data
function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("❌ Error reading data file:", err);
        reject("Unable to load sector data file!");
        return;
      }

      try {
        projects = JSON.parse(data);
        console.log(`✅ Loaded ${projects.length} projects from sectorData.json`);
        resolve();
      } catch (parseErr) {
        console.error("❌ JSON parse error:", parseErr);
        reject("Error parsing JSON data!");
      }
    });
  });
}

// ✅ Get all projects
function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) resolve(projects);
    else reject("No projects found!");
  });
}

// ✅ Get projects by sector
function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const filtered = projects.filter(
      (p) => p.sector.toLowerCase() === sector.toLowerCase()
    );
    if (filtered.length > 0) resolve(filtered);
    else reject("No projects found in that sector!");
  });
}

// ✅ Get project by ID
function getProjectById(id) {
  return new Promise((resolve, reject) => {
    const found = projects.find((p) => p.id == id);
    if (found) resolve(found);
    else reject("Project not found!");
  });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectsBySector,
  getProjectById,
};
