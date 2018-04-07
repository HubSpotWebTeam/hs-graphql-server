require('dotenv').config();
const qs = require('querystring');
const { GraphQLServer } = require('graphql-yoga');
const pjs = require('./package.json');
const moment = require('moment');
const HubspotAPI = require('@hs-web-team/hs-api');

const { PORT: port } = process.env;
let idCount = 0;

const assertHasCredentials = ctx => {
  if (!ctx.hapikey && !ctx.accessToken) {
    throw new Error('Credentials are required');
  }
};

const typeDefs = './schemas/hubspot.graphql';
const context = async ({ request }) => {
  const ctx = {
    timestamp: moment()
  };
  Object.assign(ctx, request.query);
  // TODO: Extract authorization header here
  return ctx;
};

const resolvers = {
  Query: {
    version: (_, opts, context) => {
      assertHasCredentials(context);
      console.log(context);
      return pjs.version;
    },
    blogPost: async (_, opts, context) => {
      const { id } = opts;
      assertHasCredentials(context);
      const { hapikey } = context;
      const hs = new HubspotAPI({ hapikey });
      const response = await hs.blog.getPostById(id);
      // console.log(response);
      return response;
    },
    blogPosts: (_, opts, context) => {
      assertHasCredentials(context);
      console.log(context);
      return [{}];
    }
  }
};

const options = {
  port
};

const server = new GraphQLServer({ typeDefs, resolvers, context });

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
);
