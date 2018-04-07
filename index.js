require('dotenv').config();
const qs = require('querystring');
const { GraphQLServer } = require('graphql-yoga');
const pjs = require('./package.json');
const moment = require('moment');
const HubspotAPI = require('@hs-web-team/hs-api');

const { PORT: port } = process.env;
let idCount = 0;

const assertHasCredentials = ctx => {
  if (!ctx.hs) {
    throw new Error('Credentials are required');
  }
};

const typeDefs = './schemas/hubspot.graphql';
const context = async ({ request }) => {
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
      const { hs } = context;
      const response = await hs.blog.getPostById(id);
      return response;
    },
    blogPosts: async (_, opts, context) => {
      const { contentGroupId: content_group_id } = opts;
      assertHasCredentials(context);
      const { hs } = context;
      const response = await hs.blog.getPosts({ content_group_id });
      const { objects } = response;
      return objects;
      // return [{}];
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
