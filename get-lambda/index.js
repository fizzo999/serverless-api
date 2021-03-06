'use strict';

const uuid = require('uuid').v4;
const dynamoose = require('dynamoose');
const PeopleModel = require('./contacts.schema.js');

exports.handler = async(event) => {
  let data;
  try {
    const _id = event.queryStringParameters && event.queryStringParameters.id;
    // const _id = event.pathParameters ? event.pathParameters.id : null;

    if (_id) {
      const list = await PeopleModel.query('_id').eq(_id).exec();
      data = list[0];
    } else {
      data = await PeopleModel.scan().exec();
    }
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