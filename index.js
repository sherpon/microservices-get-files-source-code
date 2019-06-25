// Get Development Env
require('./utilities/getEnv')();

const getStorage = require('./storage/getStorage');
const getFileSourceCode = require('./storage/getFileSourceCode');

let storage;

const getFilesSourceCodeStep = async (req, res) => {
  try {
    const websiteId = req.query.websiteId;
    const file = {
      filename: req.body.filename,
      type: req.body.type,
    };
    storage = getStorage(storage);
    const content = await getFileSourceCode(storage, websiteId, file);
    res.status(202);  // send ACCEPTED
    res.send({ sourceCode: content });
  } catch (error) {
    console.error(error);
    res.status(401);
    res.end();  // send no content
  }
};

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.getFilesSourceCode = async (req, res) => {
  // const userId = req.query.userId;
  // const websiteId = req.query.websiteId;

  // Set CORS headers for preflight requests
  res.set('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN);

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204)
    res.end();
  } else {
    await getFilesSourceCodeStep(req, res);
  }
};