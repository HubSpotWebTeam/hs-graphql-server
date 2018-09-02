/**

  This file is intended to be a starting point, it is not intended to be
  an exhaustive list of attributes that are available in the API. You should
  extend the schemas to include *only* the fields you need in your applications.

  For a full list of available fields for each schema, please check out its
  corresponding REST API endpoint at https://developers.hubspot.com/docs/overview
 
*/

const typeDefProps = {
  contact: {
    vid: 'ID!',
    firstname: 'String',
    lastname: 'String',
    email: 'String',
    company: 'String',
  },
  page: {
    id: 'ID!',
    name: 'String',
    css_text: 'String',
    widget_containers: 'UnparsedObject',
    widgets: 'UnparsedObject',
  },
  row: {
    id: 'ID!',
    createdAt: 'Float',
    name: 'String',
    path: 'String',
    hs_name: 'String',
    hs_path: 'String',
    values: '[UnparsedObject]',
    isSoftEditable: 'Boolean',
  },
  table: {
    id: 'ID!',
    name: 'String',
    portalId: 'Int',
    createdAt: 'Int',
    createdBy: 'UnparsedObject',
    updatedBy: 'UnparsedObject',
    updated: 'Int',
    publishedAt: 'Float',
    updatedAt: 'Float',
    columns: '[UnparsedObject]',
    label: 'String',
    cosObjectType: 'String',
    deleted: 'Boolean',
    rowCount: 'Int',
    useForPages: 'Boolean',
    columnCount: 'Int',
  },
  blog: {
    id: 'ID!',
    title: 'String!',
    post_body: 'String',
    state: 'String',
    blog_author_id: 'Int',
    archived: 'Boolean!',
    campaign: 'String',
    campaign_name: 'String',
    content_group_id: 'Int',
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
    website: 'String',
  },
  workflow: {
    id: 'ID',
    name: 'String',
    type: 'String',
    name: 'String',
    actions: 'UnparsedObject',
    id: 'Int',
    description: 'String',
    enabled: 'Boolean',
    portalId: 'Int',
    isSegmentBased: 'Boolean',
    listening: 'Boolean',
    nurtureTimeRange: 'UnparsedObject',
    onlyExecOnBizDays: 'Boolean',
    insertedAt: 'Int',
    updatedAt: 'Int',
    recurringSetting: 'UnparsedObject',
    enrollOnCriteriaUpdate: 'Boolean',
    onlyEnrollsManually: 'Boolean',
    creationSource: 'UnparsedObject',
    updateSource: 'UnparsedObject',
    allowContactToTriggerMultipleTimes: 'Boolean',
    unenrollmentSetting: 'UnparsedObject',
    segmentCriteria: 'UnparsedObject',
    goalCriteria: 'UnparsedObject',
    reEnrollmentTriggerSets: 'UnparsedObject',
    triggerSets: 'UnparsedObject',
    suppressionListIds: 'UnparsedObject',
    lastUpdatedBy: 'String',
    metaData: 'UnparsedObject',
  },
};

const queryFields = [
  {
    method: 'page',
    arguments: {
      id: 'ID!',
    },
    returns: 'Page!',
  },
  {
    method: 'pages',
    arguments: {
      offset: 'Int',
      limit: 'Int!',
    },
    returns: '[Page!]!',
  },
  {
    method: 'tables',
    returns: '[Table!]!',
  },
  {
    method: 'rows',
    arguments: {
      portalId: 'Int!',
      tableId: 'Int!',
    },
    returns: '[Row!]!',
  },
  {
    method: 'blogPosts',
    arguments: {
      contentGroupId: 'ID!',
      blogAuthorId: 'Int',
      limit: 'Int!',
    },
    returns: '[BlogPost!]!',
  },
  {
    method: 'blogPost',
    arguments: {
      id: 'ID!',
    },
    returns: 'BlogPost',
  },
  {
    method: 'blogAuthor',
    arguments: {
      id: 'ID!',
    },
    returns: 'BlogAuthor',
  },
  {
    method: 'blogAuthors',
    arguments: {
      limit: 'Int!',
    },
    returns: '[BlogAuthor!]!',
  },
  {
    method: 'version',
    returns: 'String!',
  },
  {
    method: 'contact',
    arguments: {
      id: 'ID',
      email: 'String',
      utk: 'String',
    },
    returns: 'Contact',
  },
  {
    method: 'contacts',
    arguments: {
      count: 'Int!',
    },
    returns: '[Contact!]!',
  },
  {
    method: 'workflow',
    arguments: {
      id: 'ID!',
    },
    returns: 'Workflow',
  },
  {
    method: 'workflows',
    returns: '[Workflow]',
  },
];

const extractQueryMethod = qf => {
  // blogPosts(contentGroupId: ID!, blogAuthorId: Int, limit: Int!): [BlogPost!]!
  if (qf.arguments) {
    const argumentMap = Object.keys(qf.arguments)
      .map(arg => `${arg}: ${qf.arguments[arg]}`)
      .join(', ');
    return `${qf.method}(${argumentMap}): ${qf.returns}`;
  }
  return `${qf.method}: ${qf.returns}`;
};

const contactPropertyFields = Object.keys(typeDefProps.contact);
const blogPostFields = Object.keys(typeDefProps.blog);
const blogAuthorFields = Object.keys(typeDefProps.blogAuthor);

Object.keys(typeDefProps).forEach(typeDef => {
  Object.assign(typeDefProps, {
    [typeDef]: Object.keys(typeDefProps[typeDef])
      .map(prop => `\t${prop}: ${typeDefProps[typeDef][prop]}`)
      .join('\r\n'),
  });
});

module.exports = {
  contactPropertyFields,
  blogPostFields,
  blogAuthorFields,
  typeDefs: `
    scalar UnparsedObject

    type Query {
      ${queryFields.map(extractQueryMethod).join('\r\n')}
    }

    type Page {
      ${typeDefProps.page}
    }

    type Table {
      ${typeDefProps.table}
    }

    type Row {
      ${typeDefProps.row}
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

    type Workflow {
      ${typeDefProps.workflow}
    }
  `,
};
