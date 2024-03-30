const { compareSync } = require("bcrypt");
const service_error_handler = require("../../Abstraction/service_error_handler");
const Entity = require("../../Functions/ORM/Repositry");
const { response } = require("express");
const categories = new Entity("categories");

const create_categories_service = service_error_handler(async (req, res) => {
  const { ...data } = req.body;
  const result = await categories.create(data);
  const response = {
    data: result.insertId,
  };
  return response;
});

const view_categories_service = service_error_handler(async (req, res) => {
  const result = await categories.findAll();
  const response = {
    data: result,
  };
  return response;
});

module.exports = { create_categories_service, view_categories_service };
