const connection = require("../connection")

const palcesSchema = `
CREATE TABLE IF NOT EXISTS districts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);  
`

connection.query(palcesSchema, (err) => {
  if (err) {
    console.error(`Error creating districts schema: ${err.message}`)
    connection.end()
    return
  }
  console.log("districts schema created successfully")
})
