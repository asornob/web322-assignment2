const fs = require("fs");
const path = require("path");

let projects = [];

// Initialize data from JSON
function initialize() {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "../data/sectorData.json");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject("Unable to load sector data file");
        return;
      }
      try {
        projects = JSON.parse(data);
        resolve();
      } catch (parseErr) {
        reject("Error parsing JSON data");
      }
    });
  });
}

// Get all projects
function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) resolve(projects);
    else reject("No projects available");
  });
}

// Get projects by sector
function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const filtered = projects.filter(
      (proj) => proj.sector.toLowerCase() === sector.toLowerCase()
    );
    if (filtered.length > 0) resolve(filtered);
    else reject("No projects found in that sector");
  });
}

// Get project by ID
function getProjectById(id) {
  return new Promise((resolve, reject) => {
    const found = projects.find((proj) => proj.id == id);
    if (found) resolve(found);
    else reject("Project not found");
  });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectsBySector,
  getProjectById,
};
