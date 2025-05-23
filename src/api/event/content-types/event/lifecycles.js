const sanitizeHtml = require('sanitize-html');

const clean = (input) =>
  sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });

module.exports = {
  beforeCreate(event) {
    const data = event.params.data;
    if (data.title) data.title = clean(data.title);
    if (data.description) data.description = clean(data.description);
    if (data.location) data.location = clean(data.location);
    if (data.city) data.city = clean(data.city);
    if (data.tags) data.tags = clean(data.tags);
  },

  beforeUpdate(event) {
    const data = event.params.data;
    if (data.title) data.title = clean(data.title);
    if (data.description) data.description = clean(data.description);
    if (data.location) data.location = clean(data.location);
    if (data.city) data.city = clean(data.city);
    if (data.tags) data.tags = clean(data.tags);
  }
};
