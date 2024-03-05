const connection = require("../..//Models/connection")

const searchesSchema = `
CREATE TABLE IF NOT EXISTS searches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    place_id INT,
    FOREIGN KEY (place_id) REFERENCES places(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`

connection.query(searchesSchema, (err) => {
  if (err) {
    console.error(`Error creating searches schema: ${err.message}`)
    connection.end()
  } else {
    console.log(`Searches schema created successfully`)
  }
})
