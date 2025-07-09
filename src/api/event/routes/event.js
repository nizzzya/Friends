const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::event.event', {
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