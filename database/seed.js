const db = require("./db");
const fs = require("fs");
const path = require("path");

// Read the seed SQL file
const seedSQL = fs.readFileSync(path.join(__dirname, "seed.sql"), "utf8");

// Execute the seed SQL statements
db.exec(seedSQL, (err) => {
  if (err) {
    console.error("Error seeding database:", err.message);
    process.exit(1);
  } else {
    console.log("Database seeded successfully.");
    process.exit(0);
  }
});
