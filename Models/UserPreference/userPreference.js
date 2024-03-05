const connection = require("../../Models/connection")
const usersPreferenceSchema = ` 
CREATE TABLE IF NOT EXISTS usersPreference (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT ,
    preference_name VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
)
`

connection.query(usersPreferenceSchema, (err) => {
  if (err) {
    console.error(
      `Error creating usersPreference sechma: ${err.message.sqlMessage}`
    )
    connection.end()
    return
  }
  console.log("usersPreference sechma created successfully")
})
