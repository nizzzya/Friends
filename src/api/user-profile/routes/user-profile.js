const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::user-profile.user-profile', {
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