'use strict';

const uuid = require('uuid').v4;
const dynamoose = require('dynamoose');
const PeopleModel = require('./contacts.schema.js');

exports.handler = async(event) => {
  try {
    const { name, phone } = JSON.parse(event.body);
    const _id = uuid();
    const record = new PeopleModel({ _id, name, phone});
    const data = await record.save();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (e) {
    return {
      statusCode: 500,
      response: e.message
    }
  }
}
