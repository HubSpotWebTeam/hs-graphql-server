const pjs = require('./package.json');
const debug = require('debug')('hubspot-gql');

const assertHasCredentials = ctx => {
  if (!ctx.hs) {
    throw new Error('Credentials are required');
  }
};

const flattenProps = properties =>
  Object.keys(properties).reduce((acc, curr) => {
    acc[curr] = properties[curr].value;
    return acc;
  }, {});

module.exports = {
  version: (_, opts, context) => {
    assertHasCredentials(context);
    return pjs.version;
  },
  contacts: async (_, opts, context) => {
    assertHasCredentials(context);
    const { hs } = context;
    const response = await hs.contacts.getContacts(opts);
    const { contacts } = response;
    return contacts.map(contact => {
      const { vid, properties } = contact;
      return Object.assign({ vid }, flattenProps(properties));
    });
  },
  contact: async (_, opts, context) => {
    assertHasCredentials(context);
    const { hs } = context;
    const response = await hs.contacts.getById(opts.id);
    const { vid, properties } = response;
    return Object.assign({ vid }, flattenProps(properties));
  },
  blogAuthor: async (_, opts, context) => {
    assertHasCredentials(context);
    const { hs } = context;
    const response = await hs.blog.getAuthor(opts.id);
    return response;
  },
  blogAuthors: async (_, opts, context) => {
    assertHasCredentials(context);
    const { hs } = context;
    const response = await hs.blog.getAuthors(opts);
    const { objects } = response;
    return objects;
  },
  blogPost: async (_, opts, context) => {
    assertHasCredentials(context);
    const { hs } = context;
    const response = await hs.blog.getPostById(opts);
    return response;
  },
  blogPosts: async (_, opts, context) => {
    const { contentGroupId: content_group_id } = opts;
    assertHasCredentials(context);
    const { hs } = context;
    const response = await hs.blog.getPosts({ content_group_id });
    const { objects } = response;
    return objects;
  }
};
