const connection = require("../connection")

// const hotels = {
//   journey_id: "INT",
//   user_id: "INT",
//   starting_point: "VARCHAR(255)",
//   destination: "VARCHAR(255)",
// }

const hotelsSchema = `
CREATE TABLE IF NOT EXISTS hotels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  category VARCHAR(50)
);
  
`

connection.query(hotelsSchema, (err) => {
  if (err) {
    console.error(`Error creating hotels schema: ${err.message}`)
    connection.end() // Corrected function invocation
    return
  }
  console.log("Hotels schema created successfully")
})
