const connection = require("../connection")

const destinationSchema = `
CREATE TABLE IF NOT EXISTS destinations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  Description TEXT,
  img_url VARCHAR(255),
  district_id INT,
  FOREIGN KEY (district_id) REFERENCES districts(id)
);

`

connection.query(destinationSchema, (err) => {
  if (err) {
    console.error(`Error creating destinations schema: ${err.message}`)
    connection.end()
    return
  }
  console.log("destinations schema created successfully")
})
