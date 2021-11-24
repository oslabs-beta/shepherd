const AWSUtilFunc = require('./utils/AWSUtilFunc.js');
const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

//Extract the CloudWatch Metrics for the Lambda Functions
//***********************Begin************************ */

const getMetricsByFunc = async (req, res, next) => {
  const cwClient = new CloudWatchClient({
    region: req.body.region,
    credentials: req.body.credentials,
  });

  //initialize the variables for creating the inputs for AWS request
  let graphPeriod, graphUnits, graphMetricName, funcNames, graphMetricStat;

  funcNames = req.body.funcNames;

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

  //Metrics for By Lambda Function
  //Prepare the input parameters for the AWS getMetricsData API Query

  const metricByFuncInputParams = AWSUtilFunc.prepCwMetricQueryLambdaByFunc(
    graphPeriod,
    graphUnits,
    graphMetricName,
    graphMetricStat,
    funcNames
  );

  try {
    const metricByFuncResult = await cwClient.send(
      new GetMetricDataCommand(metricByFuncInputParams)
    );

    //Format of the MetricDataResults
    //******************************* */
    // "MetricDataResults": [
    //   {
    //     "Id": "m0",
    //     "Label": "Lambda Invocations CryptoRefreshProfits",
    //     "Timestamps": [
    //       "2021-07-22T21:00:00.000Z",
    //       "2021-07-22T20:00:00.000Z",
    //       "2021-07-22T00:00:00.000Z"
    //     ],
    //     "Values": [
    //       19,
    //       6,
    //       5
    //     ],
    //     "StatusCode": "Complete",
    //     "Messages": []
    //   },
    //   {
    //     "Id": "m1",
    //     "Label": "Lambda Invocations RequestUnicorn2",
    //     "Timestamps": [],
    //     "Values": [],
    //     "StatusCode": "Complete",
    //     "Messages": []
    //   },
    //   {
    //     "Id": "m2",
    //     "Label": "Lambda Invocations CryptoLogin",
    //     "Timestamps": [
    //       "2021-07-23T15:00:00.000Z",
    //       "2021-07-22T21:00:00.000Z",
    //       "2021-07-22T20:00:00.000Z",
    //       "2021-07-22T00:00:00.000Z",
    //       "2021-07-19T13:00:00.000Z",
    //       "2021-07-18T02:00:00.000Z"
    //     ],
    //     "Values": [
    //       1,
    //       1,
    //       3,
    //       1,
    //       1,
    //       3
    //     ],
    //     "StatusCode": "Complete",
    //     "Messages": []
    //   },
    // ]
    //******************************* */

    const metricByFuncData = metricByFuncResult.MetricDataResults.map(
      (metricDataResult) => {
        let metricName = metricDataResult.Label;
        let timeStamps = metricDataResult.Timestamps.reverse();
        let values = metricDataResult.Values.reverse();
        let metricData = timeStamps.map((timeStamp, index) => {
          return {
            x: timeStamp,
            y: values[index],
          };
        });

        let maxValue = Math.max(0, Math.max(...values));
        let total = values.reduce((accum, curr) => accum + curr, 0);

        return {
          name: metricName,
          data: metricData,
          maxVaue: maxValue,
          total: total,
        };
      }
    );

    const metricMaxValueAllFunc = metricByFuncData.reduce(
      (maxValue, dataByFunc) => {
        return Math.max(maxValue, dataByFunc.maxVaue);
      },
      0
    );

    //Request response JSON Object send to the FrontEnd

    res.locals.metricByFuncData = {
      title: `Lambda ${graphMetricName}`,
      series: metricByFuncData,
      options: {
        startTime: metricByFuncInputParams.StartTime,
        endTime: metricByFuncInputParams.EndTime,
        graphPeriod,
        graphUnits,
        metricMaxValueAllFunc,
        funcNames: funcNames,
      },
    };

    return next();
  } catch (err) {
    console.error('Error in CW getMetricsData By Functions', err);
  }
};

module.exports = getMetricsByFunc;
