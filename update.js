'use strict';

const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (typeof data.title !== 'string' || typeof data.ingredients !== 'string' || typeof data.steps !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t update the Respie record.'));
    return;
  }

  const params = {
    TableName: 'Respie',
    Item: {
      id: event.pathParameters.id,
      title: data.title,
      ingredients:data.ingredients,
      steps:data.steps
    }
    
  }
    
  dynamoDb.put(params, (error, result) =>{
    if (error){
      console.error(error)
      callback(new Error('couldn\'t UPDATE the Respie item'))
      return;
      
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};