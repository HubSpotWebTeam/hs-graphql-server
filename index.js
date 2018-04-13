require('dotenv').config();
const qs = require('querystring');
const { GraphQLServer } = require('graphql-yoga');
const UnparsedObject = require('graphql-type-json');
const Query = require('./query-resolvers');
const context = require('./context');
const typeDefs = require('./schemas/hubspot.graphql').typeDefs;
const debug = require('debug')('hubspot-gql');
const pjs = require('./package.json');
const semver = require('semver');

const version = `v${semver.major(pjs.version)}`;

const { PORT: port, NODE_ENV } = process.env;

// UnparsedObject is a base JSON object, and you should avoid using it if you can be
// prescriptive about your schema.
const resolvers = { Query, UnparsedObject };
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context
});

server.start(
  {
    port,
    endpoint: `/api/${version}`,
    tracing: NODE_ENV === 'development',
    cacheControl: true
  },
  ({ port }) =>
    debug(`Server started, listening on port ${port} for incoming requests.`)
);
