const APIUtilFunc = require('./utils/APIUtilFunc');
const {
  CloudWatchClient,
  GetMetricDataCommand,
  ListDashboardsCommand,
} = require('@aws-sdk/client-cloudwatch');

const getApiMetrics = async (req, res, next) => {
  // start a new CloudWatch client with provided credentials and region
  const cwClient = new CloudWatchClient({
    region: req.body.region,
    credentials: req.body.credentials,
  });
  let graphPeriod, graphUnits;
  // depending on selected timePeriod, organize the graphPeriod and graphUnits that will be used
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

  // getAPIMetrics helps form all params

  // parameters for requesting Latency data for API
  const latencyParams = APIUtilFunc.getAPIMetrics(
    graphPeriod,
    graphUnits,
    req.body.api,
    'Latency'
  );

  // parameters for requesting Count data for API
  const countParams = APIUtilFunc.getAPIMetrics(
    graphPeriod,
    graphUnits,
    req.body.api,
    'Count',
    'SampleCount'
  );

  // parameters for requesting 5XX data for API
  const fiveXXParams = APIUtilFunc.getAPIMetrics(
    graphPeriod,
    graphUnits,
    req.body.api,
    '5XXError'
  );

  // parameters for requesting 4XX data for API
  const fourXXParams = APIUtilFunc.getAPIMetrics(
    graphPeriod,
    graphUnits,
    req.body.api,
    '4XXError'
  );
  // the array we'll send back to frontend holding all metrics
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

    // add name of the API onto what we're sending so frontend knows how to populate and label
    const wholeApiObject = { name: req.body.api, metrics: allApiMetrics };

    res.locals.apiMetrics = wholeApiObject;
    return next();
  } catch (err) {
    console.error(err.stack, err);
  }
};

module.exports = getApiMetrics;
