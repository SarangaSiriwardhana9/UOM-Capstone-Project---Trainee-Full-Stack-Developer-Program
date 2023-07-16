const server = require("./server.js");

if (process.env.NODE_ENV === "test") {
  server.listen(3000, () => {
    console.log("Capstone Project Backend is running on http://localhost:3000");
  });
} else {
  server.listen(8090, () => {
    console.log("Capstone Project Backend is running on http://localhost:8090");
  });
}
