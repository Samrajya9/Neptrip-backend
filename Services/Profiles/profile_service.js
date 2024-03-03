const service_error_handler = require("../../Abstraction/service_error_handler")
const AppError = require("../../Error/custom_app_error")
const Entity = require("../../Functions/ORM/Repositry")
const profiles = new Entity("profiles")

const view_profile_service = service_error_handler(async (req, res) => {
  const user_id = req.id
  const user_profile = await profiles.findOne({
    user_id,
  })
  // const user_profile = await find_user_profile(user_id)
  if (!user_profile) {
    throw new AppError("No profile found for the user", 400)
  } else {
    const response_data = {
      data: user_profile[0],
    }
    return response_data
  }
})

const create_profile_service = service_error_handler(async (req, res) => {
  const profile_pic_url = req.profile_pic_url
  const { ...data } = req.body
  const user_id = req.id
  data.profile_pic_url = profile_pic_url
  data.user_id = user_id
  console.log(data)
  const user_profile = await profiles.findOne({ user_id })
  if (!user_profile) {
    const result = await profiles.create(data)
    const profile = await profiles.findOne({ user_id })
    const response = {
      data: profile[0],
      action: "create",
    }
    return response
  } else {
    const result = await profiles.update(data, { user_id })
    const profile = await profiles.findOne({ user_id })
    const response = {
      data: profile[0],
      action: "update",
    }
    return response
  }
})

const update_profile_service = service_error_handler(async (req, res) => {
  const profile_pic_url = req.profile_pic_url
  const { ...data } = req.body
  data.profile_pic_url = profile_pic_url
  const user_id = req.id
  const user_profile = await profiles.findOne({ user_id })
  if (user_profile.length == 0) {
    throw new AppError("No profile found for the user", 400)
  } else {
    const result = await profiles.update(data, { user_id })
    const profile = await profiles.findOne({ user_id })
    const response = {
      data: profile[0],
      action: "update",
    }
    return response
  }
})

const delete_profile_service = service_error_handler(async (req, res) => {
  const user_id = req.id
  const result = await profiles.delete({ user_id })
  if (!result) {
    throw new AppError("Failed to delete trip", 400)
  } else {
    const response_data = {}
    return response_data
  }
})

module.exports = {
  view_profile_service,
  create_profile_service,
  update_profile_service,
  delete_profile_service,
}
