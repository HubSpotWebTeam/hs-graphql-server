let typeDefProps = {
  contact: {
    vid: 'ID!',
    firstname: 'String',
    lastname: 'String',
    email: 'String',
    company: 'String'
  },
  blog: {
    id: 'ID!',
    title: 'String!',
    post_body: 'String!',
    state: 'String'
  },
  blogAuthor: {
    avatar: 'String',
    bio: 'String',
    created: 'Int',
    deletedAt: 'Int',
    displayName: 'String',
    email: 'String',
    facebook: 'String',
    fullName: 'String!',
    googlePlus: 'String',
    gravatarUrl: 'String',
    hasSocialProfiles: 'Boolean',
    id: 'ID!',
    linkedin: 'String',
    portalId: 'Int',
    slug: 'String',
    twitter: 'String',
    twitterUsername: 'String',
    updated: 'Int',
    username: 'String',
    website: 'String'
  }
};

const contactPropertyFields = Object.keys(typeDefProps.contact);
const blogPostFields = Object.keys(typeDefProps.blog);
const blogAuthorFields = Object.keys(typeDefProps.blogAuthor);

Object.keys(typeDefProps).forEach(typeDef => {
  Object.assign(typeDefProps, {
    [typeDef]: Object.keys(typeDefProps[typeDef])
      .map(prop => `\t${prop}: ${typeDefProps[typeDef][prop]}`)
      .join('\r\n')
  });
});

module.exports = {
  contactPropertyFields,
  blogPostFields,
  blogAuthorFields,
  typeDefs: `
    type Query {
      blogPosts(contentGroupId: ID!, blogAuthorId: Int, limit: Int!): [BlogPost!]!
      blogPost(id: ID!): BlogPost
      blogAuthor(id: ID!): BlogAuthor
      blogAuthors(limit: Int!): [BlogAuthor!]!
      contact(id: ID, email: String, utk: String): Contact
      contacts(count: Int!): [Contact!]!
      version: String!
    }

    type BlogPost {
      ${typeDefProps.blog}
    }

    type Contact {
      ${typeDefProps.contact}
    }

    type BlogAuthor {
      ${typeDefProps.blogAuthor}
    }
  `
};
