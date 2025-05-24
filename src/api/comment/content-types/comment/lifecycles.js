const sanitizeHtml = require('sanitize-html');

module.exports = {
  beforeCreate(event) {
    const data = event.params.data;
    if (data.text) {
      data.text = sanitizeHtml(data.text, {
        allowedTags: [],
        allowedAttributes: {},
      });
    }
  },

  beforeUpdate(event) {
    const data = event.params.data;
    if (data.text) {
      data.text = sanitizeHtml(data.text, {
        allowedTags: [],
        allowedAttributes: {},
      });
    }
  }
};
