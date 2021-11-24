//The following assumes that User Inputs the time timeRange (either in min, hours, days)

//input time range period for aggregating the metrics
//for e.g. if the time range selected on the front end is minutes, metrics from CloudWatch would be
// aggregated by 1 minute (60 seconds)

const timeRangePeriod = {
  minutes: 60, //60 seconds
  hours: 300, //300 secs
  days: 3600, // 1 hour
};

//rouding parameters for defining the EndTime

const timeRoundMultiplier = {
  minutes: 5, //the EndTime time stamps will be rounded to nearest 5 minutes
  hours: 15, //rounded to nearest 15 minutes
  days: 60, // rounded to nearest hour
};

//to compute the startTime

const timeRangeMultiplier = {
  minutes: 60, //the EndTime time stamps will be rounded to nearest 5 minutes
  hours: 3600, //rounded to nearest 15 minutes
  days: 86400, // rounded to nearest hour
};

const APIUtilFunc = {};

APIUtilFunc.getAPIMetrics = (
  timeRangeNum,
  timeRangeUnits,
  apiName,
  metricName,
  stat = 'Sum'
) => {
  const timeRound = timeRoundMultiplier[timeRangeUnits];
  //define the End and Start times in UNIX time Stamp format for getMetricsData method
  //Rounded off to nearest timeRoundMultiplier
  const EndTime =
    Math.round(new Date().getTime() / 1000 / 60 / timeRound) * 60 * timeRound; //current time in Unix TimeStamp
  const StartTime =
    EndTime - timeRangeNum * timeRangeMultiplier[timeRangeUnits];

  const period = timeRangePeriod[timeRangeUnits];

  //initialize the parameters
  const metricParamsBaseAllFunc = {
    StartTime: new Date(StartTime * 1000),
    EndTime: new Date(EndTime * 1000),
    LabelOptions: {
      Timezone: '-0400',
    },
  };

  const metricDataQueryAllfunc = [
    {
      Id: `m_API_Gateway_${metricName}`,
      Label: `${apiName} API ${metricName}`,
      MetricStat: {
        Metric: {
          Namespace: 'AWS/ApiGateway',
          MetricName: metricName,
          Dimensions: [{ Name: 'ApiName', Value: apiName }],
        },
        Period: period,
        Stat: stat,
      },
    },
  ];

  const metricParamsAllfunc = {
    ...metricParamsBaseAllFunc,
    MetricDataQueries: metricDataQueryAllfunc,
  };

  return metricParamsAllfunc;
};

module.exports = APIUtilFunc;
