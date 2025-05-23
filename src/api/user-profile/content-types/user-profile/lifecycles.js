const sanitizeHtml = require('sanitize-html');

const clean = (input) =>
  sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });

module.exports = {
  beforeCreate(event) {
    const data = event.params.data;
    if (data.username) data.username = clean(data.username);
    if (data.location) data.location = clean(data.location);
    if (data.bio) data.bio = clean(data.bio);
  },

  beforeUpdate(event) {
    const data = event.params.data;
    if (data.username) data.username = clean(data.username);
    if (data.location) data.location = clean(data.location);
    if (data.bio) data.bio = clean(data.bio);
  }
};
