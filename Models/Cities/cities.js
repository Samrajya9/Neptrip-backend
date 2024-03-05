const connection = require("../../Models/connection")

const destinationSchema = `
CREATE TABLE IF NOT EXISTS destination(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    category VARCHAR(50),
    Description TEXT
)
`

connection.query(destinationSchema, (err) => {
  if (err) {
    console.error(`Error creating destination schema: ${err.message}`)
    connection.end()
    return
  }
  console.log("Destination schema created successfully")
})
