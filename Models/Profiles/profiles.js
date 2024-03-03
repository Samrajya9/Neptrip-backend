const connection = require("../../Models/connection")

const profiles = {
  full_name: "VARCHAR(255)",
  phone: "VARCHAR(255)",
  address: "VARCHAR(255)",
  date_of_birth: "DATE",
  gender: "VARCHAR(255)",
  profile_pic_url: "VARCHAR(255)",
  user_id: "INT UNIQUE",
}

const profileSchema = `
CREATE TABLE IF NOT EXISTS profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255),
    phone VARCHAR(255),
    address VARCHAR(255),
    date_of_birth DATE,
    gender VARCHAR(255),
    profile_pic_url VARCHAR(255),
    user_id INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
`

connection.query(profileSchema, (err) => {
  if (err) {
    console.error(`Error creating profiles sechma: ${err.message.sqlMessage}`)
    connection.end()
    return
  }
  console.log("profiles sechma created successfully")
})
