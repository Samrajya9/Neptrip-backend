const connection = require("../../Models/connection")

class Entity {
  constructor(table) {
    this.table = table
  }
  findAll() {
    const query = `SELECT * FROM ${this.table}`
    console.log(query)
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(structuredClone(result)) /*return an array */
        }
      })
    })
  }
  findOne(criteria) {
    const fields = Object.keys(criteria)
    const value = Object.values(criteria)
    const conditions = fields.map((field) => `${field} = ?`).join(" AND ")
    const query = `SELECT * FROM ${this.table} WHERE ${conditions}`
    console.log(query)
    return new Promise((resolve, reject) => {
      connection.query(query, value, (err, result) => {
        if (err) {
          reject(err)
        } else {
          if (result.length === 0) {
            resolve(false)
          } else {
            resolve(structuredClone(result))
          }
        }
      })
    })
  }
  create(data) {
    console.log(data)
    const fields = Object.keys(data)
    const values = Object.values(data)
    const insertFields = fields.join(", ")
    const comma = Array(values.length).fill("?").join(", ")
    const query = `INSERT INTO ${this.table} (${insertFields}) VALUES(${comma})`
    console.log(query)
    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(structuredClone(result))
        }
      })
    })
  }
  delete(options) {
    const fields = Object.keys(options)
    const values = Object.values(options)
    const conditions = fields.map((field) => `${field}=?`).join("AND")
    const query = `DELETE FROM ${this.table} WHERE ${conditions}`
    console.log(query)
    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err)
        } else {
          if (structuredClone(result).affectedRows > 0) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  }
  update(data, options) {
    const datafields = Object.keys(data)
    const datavalues = Object.values(data)
    const optionsfields = Object.keys(options)
    const optionsvalues = Object.values(options)
    const setValues = datavalues.concat(optionsvalues)
    const updateField = datafields.map((field) => `${field}=?`).join(",")
    const conditions = optionsfields.map((field) => `${field}=?`).join("AND")
    const query = `UPDATE ${this.table} SET ${updateField} WHERE ${conditions}`
    console.log(query)
    return new Promise((resolve, reject) => {
      connection.query(query, setValues, (err, result) => {
        if (err) {
          reject(err)
        } else {
          if (structuredClone(result).affectedRows > 0) {
            resolve(true)
          } else resolve(false)
        }
      })
    })
  }
}
module.exports = Entity
