const fs = require("fs");
const path = require("path");

let projects = [];

// ✅ Correct file path for Vercel and local both
const filePath = path.resolve(__dirname, "../data/sectorData.json");

// initialize data from JSON
function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject("Unable to load data file!");
      else {
        projects = JSON.parse(data);
        resolve();
      }
    });
  });
}

// get all projects
function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) resolve(projects);
    else reject("No projects found!");
  });
}

// get projects by sector
function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const filtered = projects.filter(
      (proj) => proj.sector.toLowerCase() === sector.toLowerCase()
    );
    if (filtered.length > 0) resolve(filtered);
    else reject("No projects found in that sector!");
  });
}

module.exports = { initialize, getAllProjects, getProjectsBySector };
