const moment = require('moment');
const HubspotAPI = require('hubspot-api');

module.exports = async ({ request }) => {
  const ctx = {
    timestamp: moment().valueOf()
  };
  Object.assign(ctx, request.query);

  const { hapikey } = request.query;
  const { authorization } = request.headers;
  if (hapikey) {
    const hs = new HubspotAPI({ hapikey });
    Object.assign(ctx, { hs });
  } else if (authorization) {
    // Access Token passed as header in the format:
    /*
      { 'Authorization': 'Bearer {accessToken}' }
    */
    const accessToken = authorization.slice(7);
    const hs = new HubspotAPI({ accessToken });
    Object.assign(ctx, { hs });
  }
  return ctx;
};
