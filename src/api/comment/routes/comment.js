const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::comment.comment', {
  config: {
    update: {
      policies: [
        'global::is-owner',
      ],
    },
    delete: {
      policies: [
        'global::is-owner',
      ],
    },
  },
}); 