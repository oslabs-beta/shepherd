const {
  Lambda,
  LambdaClient,
  ListFunctionsCommand,
} = require('@aws-sdk/client-lambda');

//Extract Lambda Functions for the Assumed Role
//***********************Begin************************ */

const getFunctions = async (req, res, next) => {
  console.log('triggered getFunc middleware')
  console.log('THIS IS THE REQUEST BODY',req.body)
  const lambdaClient = new LambdaClient({
    region: req.body.region,
    credentials: req.body.credentials,
  });

  const lamParams = { FunctionVersion: 'ALL' };
  let funcNames = [];
  try {
    const functions = await lambdaClient.send(
      new ListFunctionsCommand(lamParams)
    );
    funcNames = functions.Functions.map((el) => el.FunctionName);
    res.locals.functions = funcNames;
    return next();
  } catch (err) {
    console.error('Error in Lambda List Functions: ', err);
    return next(err);
  }
};
//***********************End************************ */
module.exports = getFunctions;


// body: JSON.stringify({
//   credentials: props.credentials,
//   timePeriod: timePeriod,
//   funcNames: props.aws.functions,
//   region: region,

// }),
// fetch('/aws/getMetricsByFunc/Invocations', reqParams)
// .then((res) => res.json())
// .then((invocationData) => {
//   props.addInvocationsByFuncData(invocationData);
// })
// .catch((err) => console.error(err));