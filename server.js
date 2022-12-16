const dbConfig = require("./dbConfig");
const app = require("./app");

dbConfig();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});
