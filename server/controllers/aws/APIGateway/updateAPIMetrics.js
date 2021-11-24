const APIUtilFunc = require('./utils/APIUtilFunc');
const {
  CloudWatchClient,
  GetMetricDataCommand,
  ListDashboardsCommand,
} = require('@aws-sdk/client-cloudwatch');

const updateApiMetrics = async (req, res, next) => {
  // depending on selected timePeriod, organize the graphPeriod and graphUnits that will be used
  let graphPeriod, graphUnits;
  if (req.body.newTimePeriod === '30min') {
    [graphPeriod, graphUnits] = [30, 'minutes'];
  } else if (req.body.newTimePeriod === '1hr') {
    [graphPeriod, graphUnits] = [60, 'minutes'];
  } else if (req.body.newTimePeriod === '24hr') {
    [graphPeriod, graphUnits] = [24, 'hours'];
  } else if (req.body.newTimePeriod === '7d') {
    [graphPeriod, graphUnits] = [7, 'days'];
  } else if (req.body.newTimePeriod === '14d') {
    [graphPeriod, graphUnits] = [14, 'days'];
  } else if (req.body.newTimePeriod === '30d') {
    [graphPeriod, graphUnits] = [30, 'days'];
  }

  // array to store the updated metrics on
  const updatedApiMetrics = [];

  // loop through the existing API List as there could be more than one API to refetch for
  for (let i = 0; i < req.body.apiList.length; i += 1) {
    const currApi = req.body.apiList[i].name;

    // each API goes through loopFunc to fetch new metrics and then it's pushed onto updatedApiMetrics
    const newMetricObj = await loopFunc(
      currApi,
      graphPeriod,
      graphUnits,
      req.body.credentials,
      req.body.region
    );
    updatedApiMetrics.push(newMetricObj);
  }
  res.locals.apiMetrics = updatedApiMetrics;
  return next();
};

module.exports = updateApiMetrics;

const loopFunc = async (
  currApi,
  graphPeriod,
  graphUnits,
  credentials,
  region
) => {
  // start a new CloudWatch client with provided credentials and region
  const cwClient = new CloudWatchClient({
    region,
    credentials: credentials,
  });

  // getAPIMetrics helps form all params

  // parameters for requesting Latency data for API
  const latencyParams = APIUtilFunc.getAPIMetrics(
    graphPeriod,
    graphUnits,
    currApi,
    'Latency'
  );

  // parameters for requesting Count data for API
  const countParams = APIUtilFunc.getAPIMetrics(
    graphPeriod,
    graphUnits,
    currApi,
    'Count',
    'SampleCount'
  );

  // parameters for requesting 5XX data for API
  const fiveXXParams = APIUtilFunc.getAPIMetrics(
    graphPeriod,
    graphUnits,
    currApi,
    '5XXError'
  );

  // parameters for requesting 4XX data for API
  const fourXXParams = APIUtilFunc.getAPIMetrics(
    graphPeriod,
    graphUnits,
    currApi,
    '4XXError'
  );

  const allApiMetrics = [];
  try {
    // await Latency Metrics from AWS
    const latencyMetrics = await cwClient.send(
      new GetMetricDataCommand(latencyParams)
    );

    // create the X,Y points for the chart
    const latencyData = latencyMetrics.MetricDataResults[0].Timestamps.map(
      (timeStamp, index) => {
        return {
          x: timeStamp,
          y: latencyMetrics.MetricDataResults[0].Values[index],
        };
      }
    );

    // find what the max value is to set the high for the chart
    const latencyMaxValue = Math.max(
      ...latencyMetrics.MetricDataResults[0].Values,
      0
    );

    // populate the data into one object to be pushed on the allApiMetrics array
    const latencyDataPoints = {
      title: latencyMetrics.MetricDataResults[0].Label,
      metricType: 'Latency',
      data: latencyData.reverse(),
      secondData: latencyMetrics.MetricDataResults[0].Values,
      secondLabels: latencyMetrics.MetricDataResults[0].Timestamps,
      options: {
        startTime: latencyParams.StartTime,
        endTime: latencyParams.EndTime,
        graphPeriod,
        graphUnits,
        maxValue: latencyMaxValue,
      },
    };

    allApiMetrics.push(latencyDataPoints);

    // await Count Metrics from AWS
    const countMetrics = await cwClient.send(
      new GetMetricDataCommand(countParams)
    );

    // create the X,Y points for the chart
    const countData = countMetrics.MetricDataResults[0].Timestamps.map(
      (timeStamp, index) => {
        return {
          x: timeStamp,
          y: countMetrics.MetricDataResults[0].Values[index],
        };
      }
    );

    // find what the max value is to set the high for the chart
    const countMaxValue = Math.max(
      ...countMetrics.MetricDataResults[0].Values,
      0
    );

    // populate the data into one object to be pushed on the allApiMetrics array
    const countDataPoints = {
      title: countMetrics.MetricDataResults[0].Label,
      metricType: 'Count',
      data: countData.reverse(),
      secondData: countMetrics.MetricDataResults[0].Values,
      secondLabels: countMetrics.MetricDataResults[0].Timestamps,
      options: {
        startTime: countParams.StartTime,
        endTime: countParams.EndTime,
        graphPeriod,
        graphUnits,
        maxValue: countMaxValue,
      },
    };

    allApiMetrics.push(countDataPoints);

    // await 5XX Metrics from AWS
    const fiveXXMetrics = await cwClient.send(
      new GetMetricDataCommand(fiveXXParams)
    );

    // create the X,Y points for the chart
    const fiveXXData = fiveXXMetrics.MetricDataResults[0].Timestamps.map(
      (timeStamp, index) => {
        return {
          x: timeStamp,
          y: fiveXXMetrics.MetricDataResults[0].Values[index],
        };
      }
    );

    // find what the max value is to set the high for the chart
    const fiveXXMaxValue = Math.max(
      ...fiveXXMetrics.MetricDataResults[0].Values,
      0
    );

    // populate the data into one object to be pushed on the allApiMetrics array
    const fiveXXDataPoints = {
      title: fiveXXMetrics.MetricDataResults[0].Label,
      metricType: '5XX',
      data: fiveXXData.reverse(),
      secondData: fiveXXMetrics.MetricDataResults[0].Values,
      secondLabels: fiveXXMetrics.MetricDataResults[0].Timestamps,
      options: {
        startTime: fiveXXParams.StartTime,
        endTime: fiveXXParams.EndTime,
        graphPeriod,
        graphUnits,
        maxValue: fiveXXMaxValue,
      },
    };

    allApiMetrics.push(fiveXXDataPoints);

    // await 4XX Metrics from AWS
    const fourXXMetrics = await cwClient.send(
      new GetMetricDataCommand(fourXXParams)
    );

    // create the X,Y points for the chart
    const fourXXData = fourXXMetrics.MetricDataResults[0].Timestamps.map(
      (timeStamp, index) => {
        return {
          x: timeStamp,
          y: fourXXMetrics.MetricDataResults[0].Values[index],
        };
      }
    );

    // find what the max value is to set the high for the chart
    const fourXXMaxValue = Math.max(
      ...fourXXMetrics.MetricDataResults[0].Values,
      0
    );

    // populate the data into one object to be pushed on the allApiMetrics array
    const fourXXDataPoints = {
      title: fourXXMetrics.MetricDataResults[0].Label,
      metricType: '4XX',
      data: fourXXData.reverse(),
      secondData: fourXXMetrics.MetricDataResults[0].Values,
      secondLabels: fourXXMetrics.MetricDataResults[0].Timestamps,
      options: {
        startTime: fourXXParams.StartTime,
        endTime: fourXXParams.EndTime,
        graphPeriod,
        graphUnits,
        maxValue: fourXXMaxValue,
      },
    };

    allApiMetrics.push(fourXXDataPoints);
    // create the new API object to send back and push on the larger updated API metrics array
    const wholeApiObject = { name: currApi, metrics: allApiMetrics };
    return wholeApiObject;
  } catch (err) {
    console.error(err.stack, err);
  }
};
