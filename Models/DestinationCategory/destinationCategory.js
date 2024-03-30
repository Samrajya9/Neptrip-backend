const connection = require("../connection");

const destinationSchema = `
CREATE TABLE IF NOT EXISTS destinationCategories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  destination_id INT,
  category_id INT,
  FOREIGN KEY (destination_id) REFERENCES destinations(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  PRIMARY KEY (destination_id, category_id)
);
`;
connection.query(destinationSchema, (err) => {
  if (err) {
    console.error(
      `Error creating destinationCategories schema: ${err.message}`
    );
    connection.end();
    return;
  }
  console.log("destinationCategories schema created successfully");
});
