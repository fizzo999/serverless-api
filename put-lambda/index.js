'use strict';

const uuid = require('uuid').v4;
const dynamoose = require('dynamoose');
const PeopleModel = require('./contacts.schema.js');

//     PUT (update)
exports.handler = async(event) => {

  // let data;

  try {

    const { name, phone } = JSON.parse(event.body);
    const _id = event.queryStringParameters && event.queryStringParameters.id || event.pathParameters && event.pathParameters.id;
    console.log('WELL WELL WELL HERE IS THE ID =========>>>>>', _id);

    // if (_id){
    //   data = await PeopleModel.update({ "_id" : _id }, { "name": name, "phone": phone });

    // } else {
    //   const listByName = await PeopleModel.query("name").eq({name}).exec();
    //   console.log('WELL WELL WELL HERE IS THE ID =========>>>>>', listByName[0])
    //   let retrievedId = listByName[0][_id];
    //   data = await PeopleModel.update({ "_id": retrievedId}, { "name": name, "phone": phone });
    // }

    const data = await PeopleModel.update({ "_id": _id }, { "name": name, "phone": phone });

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