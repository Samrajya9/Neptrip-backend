const connection = require("../connection")

const journeys = {
  journey_id: "INT",
  user_id: "INT",
  starting_point: "VARCHAR(255)",
  destination: "VARCHAR(255)",
}

const journeysSchema = `
CREATE TABLE IF NOT EXISTS trips (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  date DATE,
  source VARCHAR(255),
  destination VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
`
connection.query(journeysSchema, (err) => {
  if (err) {
    console.error(`Error creating profiles sechma: ${err.message.sqlMessage}`)
    connection.end
    return
  }
  console.log("trips sechma created successfully")
})
