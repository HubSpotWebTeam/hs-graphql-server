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

const contactsResponse = contact => {
  const { vid, properties } = contact;
  debug(properties);
  return Object.assign({ vid }, flattenProps(properties));
};

module.exports = {
  version: (_, opts, context) => {
    assertHasCredentials(context);
    return pjs.version;
  },
  contacts: async (_, opts, context) => {
    assertHasCredentials(context);
    const { hs } = context;
    // Define extra properties as required by the schema
    Object.assign(opts, { property: ['email', 'firstname', 'lastname'] });
    const response = await hs.contacts.getContacts(opts);
    const { contacts } = response;
    return contacts.map(contactsResponse);
  },
  contact: async (_, opts, context) => {
    assertHasCredentials(context);
    const { hs } = context;
    const { id, email, utk } = opts;
    let response;
    if (id) {
      response = await hs.contacts.getById(id);
    } else if (email) {
      response = await hs.contacts.getByEmail(email);
    } else if (utk) {
      response = await hs.contacts.getByUtk(utk);
    } else {
      throw new Error(
        'You must specify one of `id`, `email`, `utk` in your query'
      );
    }
    const { vid, properties } = response;
    return contactsResponse(response);
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
