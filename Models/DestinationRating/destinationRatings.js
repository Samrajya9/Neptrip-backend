const connection = require("../connection")

const ratingsSchema = `
CREATE TABLE IF NOT EXISTS destinationRatings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  rating INT,
  destination_id INT,
  user_id INT,
  FOREIGN KEY (destination_id) REFERENCES destinations(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
`

connection.query(ratingsSchema, (err) => {
  if (err) {
    console.error(`Error creating destinationRatings schema: ${err.message}`)
    connection.end()
    return
  }
  console.log("destinationRatings schema created successfully")
})
