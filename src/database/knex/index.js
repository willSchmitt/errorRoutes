const config = require('../../../knexfile');
const knex = require('knex');


const connection = knex()

module.exports = connection;