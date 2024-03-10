const connection = require("../connection")

const destinationSchema = `
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
  );
`

connection.query(destinationSchema, (err) => {
  if (err) {
    console.error(`Error creating categories schema: ${err.message}`)
    connection.end()
    return
  }
  console.log("categories schema created successfully")
})
