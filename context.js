const moment = require('moment');
const HubspotAPI = require('hs-api');

module.exports = async ({ request }) => {
  const ctx = {
    timestamp: moment()
  };
  Object.assign(ctx, request.query);

  const { hapikey } = request.query;
  // const { authorization } = request.headers;
  if (hapikey) {
    const hs = new HubspotAPI({ hapikey });
    Object.assign(ctx, { hs });
  }
  // TODO: Extract authorization header here
  return ctx;
};
