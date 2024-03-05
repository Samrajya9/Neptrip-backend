const { response } = require("express")
const service_error_handler = require("../../Abstraction/service_error_handler")
const Entity = require("../../Functions/ORM/Repositry")

const usersPreference = new Entity("usersPreference")
const hotels = new Entity("hotels")
const destination = new Entity("Destination")

const recommendation_service = service_error_handler(async (req, res) => {
  const user_id = req.id
  const user_preferences = await usersPreference.findOne({ user_id })

  let result = null // Define result variable outside the if-else block

  if (!user_preferences || user_preferences.length === 0) {
    // Handle case where user preferences are not found
    // For example:
    return res.status(404).json({ message: "User preferences not found" })
  } else {
    const preference_names = user_preferences.map(
      (preference) => preference.preference_name
    )
    console.log(preference_names)
    console.log(user_id)

    // Construct SQL query with parameterized query

    // Execute the query
    result = await hotels.query("category", preference_names)
    const result1 = await destination.query("category", preference_names)
    const response = {
      hotel: result,
      destination: result1,
    }
    return { data: response }
  }

  // Return response inside the service_error_handler
})

module.exports = recommendation_service
