require('dotenv').config();
module.exports = {
  client: {
    includes: ['./**/*.ts'],
    service: {
      name: 'hasura',
      url: `${process.env.HSR_ENDPOINT}`,
      // optional headers
      headers: {
        'x-hasura-admin-secret': process.env.HSR_ADMIN_SECRET,
      },
    },
  },
};
