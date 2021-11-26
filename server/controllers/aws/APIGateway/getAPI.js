const {
  APIGatewayClient,
  GetRestApisCommand,
  GetResourcesCommand,
  GetIntegrationCommand,
  GetUsagePlansCommand,
} = require('@aws-sdk/client-api-gateway');

const getAPIData = async (req, res, next) => {
  const client = new APIGatewayClient({
    region: req.body.region,
    credentials: req.body.credentials,
  });
  const apiData = [];
  // Retrieves list of Rest APIs and their names, i.e. 'Crypto' and 'WildRydes' plus their ids
  try {
    const restAPIs = await client.send(new GetRestApisCommand({}));
    // push each existing API, their ID, and an empty array to later store their resources to the apiData array which is what we'll send to frontend at the end
    restAPIs.items.forEach((api) => {
      apiObj = { name: api.name, apiId: api.id, resources: [] };
      apiData.push(apiObj);
    });

    // loop through the APIs and send a request to get each of their resources
    for (let i = 0; i < apiData.length; i += 1) {
      const resources = await client.send(
        new GetResourcesCommand({ restApiId: apiData[i].apiId })
      );
      // loop through array that AWS returns
      for (let j = 0; j < resources.items.length; j += 1) {
        // create object to store each resource's details on it
        const resourceEl = {
          resourceId: resources.items[j].id,
          path: resources.items[j].path,
        };
        // create an array that holds the methods existing on the resource (e.g. GET, POST, OPTIONS) - needed for later request to AWS
        if (resources.items[j].resourceMethods) {
          resourceEl.methodsArr = Object.keys(
            resources.items[j].resourceMethods
          );
          // if there are no methods on the resource, set it to undefined
        } else {
          resourceEl.methodsArr = undefined;
        }
        // push resources into the applicable resources array in apiData
        apiData[i].resources.push(resourceEl);
      }
    }

    // loop through apiData again
    for (let j = 0; j < apiData.length; j += 1) {
      const currApi = apiData[j];
      // loop through resources that exist on specific API
      for (let k = 0; k < currApi.resources.length; k += 1) {
        const currResource = currApi.resources[k];
        // if they have methods
        if (currResource.methodsArr) {
          currResource.methods = [];
          // loop through the existing methods
          for (let m = 0; m < currResource.methodsArr.length; m += 1) {
            const currHttpMethod = currResource.methodsArr[m];
            // if it's not 'OPTIONS':
            if (currHttpMethod !== 'OPTIONS') {
              // request from AWS the details of what that method does
              // e.g. a POST request to a Lambda Function
              try {
                const integrationData = await client.send(
                  new GetIntegrationCommand({
                    restApiId: currApi.apiId,
                    resourceId: currResource.resourceId,
                    httpMethod: currHttpMethod,
                  })
                );
                // create object to store on methods array holding details about what the method does and where it drives to
                currMethodObj = {
                  method: currHttpMethod,
                  type: integrationData.type,
                };
                if (integrationData.uri.includes('lambda')) {
                  const cutString = integrationData.uri.slice(
                    integrationData.uri.indexOf('function:')
                  );
                  const lambdaFunc = cutString.slice(9).slice(0, -12);
                  currMethodObj.service = 'Lambda';
                  currMethodObj.endPoint = lambdaFunc;
                } else if (integrationData.uri.includes('dynamodb')) {
                  currMethodObj.service = 'DynamoDB';
                }
                // push it onto the current method object (which exists within apiData)
                currResource.methods.push(currMethodObj);
              } catch (err) {
                console.error('Error after integration attempt: ', err.stack);
              }
            }
          }
        }
        // if OPTIONS was the only existing method and methods doesn't have any content, delete it to clean up for frontend
        if (!currResource.methods || currResource.methods.length === 0) {
          delete currResource.methods;
        }
      }
    }
  } catch (err) {
    console.error('Error after try/catch in getAPI.js: ', err);
  }
  // send to frontend
  res.locals.apiData = apiData;
  return next();
};

module.exports = getAPIData;
