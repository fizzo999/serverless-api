'use strict';

const uuid = require('uuid').v4;
const dynamoose = require('dynamoose');
const PeopleModel = require('./contacts.schema.js');

//have to adjust POST to DELETE
exports.handler = async(event) => {

  try {

    const id = event.queryStringParameters && event.queryStringParameters.id || event.pathParameters && event.pathParameters.id;
    const { name, phone } = JSON.parse(event.body);

    const data = await PeopleModel.update({ "id": id }, { "name": name, "phone": phone });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Successfully deleted" , deletedEntry:data})
    }

  } catch (e) {
    
    return {
      statusCode: 500,
      response: e.message
    }
  }
}