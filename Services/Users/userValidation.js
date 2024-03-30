const AppError = require("../../Error/custom_app_error");

const uservalidation = (objSchema, requestobj) => {
  console.log(objSchema, requestobj);
  const keys = Object.keys(objSchema);
  keys.forEach((key) => {
    if (!requestobj.hasOwnProperty(key)) {
      throw new AppError(`${key} is not provided`);
    }
  });
};

module.exports = uservalidation;
