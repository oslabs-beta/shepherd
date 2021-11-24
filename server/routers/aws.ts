const express = require('express');
const router = express.Router();
//export{}
//AWS specific details
const getCredentials = require('../controllers/aws/Credentials/getCreds.ts');
const getFunctions = require('../controllers/aws/Metrics/getLambdaFuncs.ts');
const getMetricsAllFunc = require('../controllers/aws/Metrics/getMetricsAllFunc.ts');
const getMetricsByFunc = require('../controllers/aws/Metrics/getMetricsByFunc.ts');
const getLogs = require('../controllers/aws/Logs/getLogs.ts');
const updateLogs = require('../controllers/aws/Logs/updateLogs.ts');
const getAPIData = require('../controllers/aws/APIGateway/getAPI.ts');
const getApiMetrics = require('../controllers/aws/APIGateway/getAPIMetrics.ts');
const updateApiMetrics = require('../controllers/aws/APIGateway/updateAPIMetrics.ts');

//AWS Assumed Role Credentials
router.route('/getCreds').post(getCredentials, (req, res) => {
  res.status(200).json(res.locals.credentials);
});

//Returing Lambda Functions List
router.route('/getLambdaFunctions').post(getFunctions, (req, res) => {
  res.status(200).json(res.locals.functions);
});

//Returing Lambda Functions Metric Totals (All functions): by metricName
router
  .route('/getMetricsAllfunc/:metricName')
  .post(getMetricsAllFunc, (req, res) => {
    res.status(200).json(res.locals.metricAllFuncData);
  });

//Returing Lambda Functions Logs
router.route('/getLogs').post(getLogs, (req, res) => {
  res.status(200).json(res.locals.functionLogs);
});

//Updating Lambda Function Logs
router.route('/updateLogs').post(updateLogs, (req, res) => {
  res.status(200).json(res.locals.updatedLogs);
});

router
  .route('/getMetricsByFunc/:metricName')
  .post(getMetricsByFunc, (req, res) => {
    res.status(200).json(res.locals.metricByFuncData);
  });

// API Gateway data - list of APIs existing on user account
router.route('/apiGateway').post(getAPIData, (req, res) => {
  res.status(200).json(res.locals.apiData);
});

// handle getting an APIs metrics when requested
router.route('/getApiMetrics').post(getApiMetrics, (req, res) => {
  res.status(200).json(res.locals.apiMetrics);
});

// if time period is updated, fetches updated API metric data
router.route('/updateApiMetrics').post(updateApiMetrics, (req, res) => {
  res.status(200).json(res.locals.apiMetrics);
});

module.exports = router;
