require('dotenv').config();
const qs = require('querystring');
const { GraphQLServer } = require('graphql-yoga');
const UnparsedObject = require('graphql-type-json');
const Query = require('./query-resolvers');
const context = require('./context');
const typeDefs = require('./schemas/hubspot.graphql').typeDefs;
const debug = require('debug')('hubspot-gql');

const { PORT: port } = process.env;

// UnparsedObject is a base JSON object, and you should avoid using it if you can be
// prescriptive about your schema.
const resolvers = { Query, UnparsedObject };
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context
});

server.start({ port, tracing: true, cacheControl: true }, ({ port }) =>
  debug(`Server started, listening on port ${port} for incoming requests.`)
);
