const AWSUtilFunc = require('./utils/AWSUtilFunc.js');
const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

//Extract the CloudWatch Metrics for the Lambda Functions
//***********************Begin************************ */

const getMetricsAllFunc = async (req, res, next) => {
  const cwClient = new CloudWatchClient({
    region: req.body.region,
    credentials: req.body.credentials,
  });

  //initialize the variables for creating the inputs for AWS request
  let graphPeriod, graphUnits, graphMetricName, graphMetricStat;

  graphMetricName = req.params.metricName;

  if (req.body.timePeriod === '30min') {
    [graphPeriod, graphUnits] = [30, 'minutes'];
  } else if (req.body.timePeriod === '1hr') {
    [graphPeriod, graphUnits] = [60, 'minutes'];
  } else if (req.body.timePeriod === '24hr') {
    [graphPeriod, graphUnits] = [24, 'hours'];
  } else if (req.body.timePeriod === '7d') {
    [graphPeriod, graphUnits] = [7, 'days'];
  } else if (req.body.timePeriod === '14d') {
    [graphPeriod, graphUnits] = [14, 'days'];
  } else if (req.body.timePeriod === '30d') {
    [graphPeriod, graphUnits] = [30, 'days'];
  }

  if (!req.body.metricStat) graphMetricStat = 'Sum';
  else graphMetricStat = req.body.metricStat;

  //Metrics for All Functions (combined)
  //Prepare the input parameters for the AWS getMetricsData API Query
  const metricAllFuncInputParams = AWSUtilFunc.prepCwMetricQueryLambdaAllFunc(
    graphPeriod,
    graphUnits,
    graphMetricName,
    graphMetricStat
  );

  try {
    const metricAllFuncResult = await cwClient.send(
      new GetMetricDataCommand(metricAllFuncInputParams)
    );

    //Format of the MetricDataResults
    //******************************* */
    // "MetricDataResults": [
    //   {
    //     "Id": "m0",
    //     "Label": "Lambda Invocations CryptoRefreshProfits",
    //     "Timestamps": [
    //       "2021-07-17T02:54:00.000Z",
    //       "2021-07-17T01:54:00.000Z"
    //     ],
    //     "Values": [
    //       1400,
    //       34
    //     ],
    //     "StatusCode": "Complete",
    //     "Messages": []
    //   },
    // ]
    //******************************* */

    const metricAllFuncData =
      metricAllFuncResult.MetricDataResults[0].Timestamps.map(
        (timeStamp, index) => {
          return {
            x: timeStamp,
            y: metricAllFuncResult.MetricDataResults[0].Values[index],
          };
        }
      );
    const metricMaxValue = Math.max(
      ...metricAllFuncResult.MetricDataResults[0].Values,
      0
    );

    //Request response JSON Object send to the FrontEnd

    res.locals.metricAllFuncData = {
      title: metricAllFuncResult.MetricDataResults[0].Label,
      data: metricAllFuncData.reverse(),
      options: {
        startTime: metricAllFuncInputParams.StartTime,
        endTime: metricAllFuncInputParams.EndTime,
        graphPeriod,
        graphUnits,
        metricMaxValue,
      },
    };

    return next();
  } catch (err) {
    console.error('Error in CW getMetricsData All Functions', err);
  }
};

module.exports = getMetricsAllFunc;
