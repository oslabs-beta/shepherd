const dotenv = require('dotenv');
// const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { STSClient } = require('@aws-sdk/client-sts');

dotenv.config();

// root user credentials
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
const region = process.env.AWS_REGION;

// Create an Amazon CloudWatch Logs service client object.
const stsClient = new STSClient({
  region: region,
  credentials: credentials,
});

module.exports = {
  stsClient,
};
