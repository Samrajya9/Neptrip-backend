const connection = require("../../Models/connection")

const palcesSchema = `
CREATE TABLE IF NOT EXISTS places (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE
);

`

connection.query(palcesSchema, (err) => {
  if (err) {
    console.error(`Error creating places schema: ${err.message}`)
    connection.end()
    return
  }
  console.log("places schema created successfully")
})
