'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body);
  
  if (typeof data.title !== 'string' || typeof data.ingredients !== 'string' || typeof data.steps !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create the Respie record.'));
    return;
  }
  const params = {
    TableName: 'Respie',
    Item: {
      id: uuid.v1(),
      title: data.title,
      ingredients:data.ingredients,
      steps:data.steps
      
    }
    
  }
  dynamoDb.put(params, (error, result) =>{
    if (error){
      console.error(error)
      callback(new Error('couldn\'t create the Respie'))
      return;
      
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
    callback(null, response)
  })
}
  