// import { stsClient, REGION } from '../libs/stsClient.js';
const { stsClient } = require('./libs/stsClient.js');
const AWSUtilFunc = require('../Metrics/utils/AWSUtilFunc.js');

const { AssumeRoleCommand } = require('@aws-sdk/client-sts');
const {
  Lambda,
  LambdaClient,
  ListFunctionsCommand,
} = require('@aws-sdk/client-lambda');

const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

//Async Function to Assume role of the Client and pull metrics

const getCredentials = async (req, res, next) => {
  console.log('triggered getCred middleware')
  console.log('body: ', req.body);
  const roleParams = {
    RoleArn: req.body.arn,
    RoleSessionName: 'ShepherdSession',
  };

  try {
    const assumedRole = await stsClient.send(new AssumeRoleCommand(roleParams));
    //const AWS_REGION = 'us-east-2'
    const accessKeyId = assumedRole.Credentials.AccessKeyId;
    const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
    const sessionToken = assumedRole.Credentials.SessionToken;
    res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken };
    return next();
  } catch (err) {
    if (err) {
      console.error(err);
      return next(err);
    }
  }
};

module.exports = getCredentials;
