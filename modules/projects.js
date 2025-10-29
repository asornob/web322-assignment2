const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

// Initialize the projects array
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = [];
            projectData.forEach(proj => {
                const sectorObj = sectorData.find(sec => sec.id === proj.sector_id);
                projects.push({
                    ...proj,
                    sector: sectorObj ? sectorObj.sector_name : "Unknown"
                });
            });
            resolve();
        } catch (err) {
            reject("Unable to initialize projects: " + err);
        }
    });
}

// Return all projects
function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject("No projects found");
        }
    });
}

// Return project by ID
function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const proj = projects.find(p => p.id === projectId);
        if (proj) {
            resolve(proj);
        } else {
            reject(`Project with ID ${projectId} not found`);
        }
    });
}

// Return projects by sector (case-insensitive, partial match)
function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const lowerSector = sector.toLowerCase();
        const filtered = projects.filter(p => 
            p.sector.toLowerCase().includes(lowerSector)
        );
        if (filtered.length > 0) {
            resolve(filtered);
        } else {
            reject(`No projects found for sector: ${sector}`);
        }
    });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
