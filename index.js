require('dotenv').config();
const qs = require('querystring');
const { GraphQLServer } = require('graphql-yoga');
const Query = require('./query-resolvers');
const context = require('./context');
const typeDefs = require('./schemas/hubspot.graphql').typeDefs;

const { PORT: port } = process.env;

const resolvers = { Query };
const server = new GraphQLServer({ typeDefs, resolvers, context });
server.start({ port }, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
);
