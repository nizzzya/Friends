module.exports = async (ctx, next) => {
  const user = ctx.state.user;
  if (!user) {
    return ctx.unauthorized("You must be logged in.");
  }

  const { id } = ctx.params;
  if (!id) {
    return ctx.badRequest("Missing resource id");
  }

  // Витягуємо тип колекції з шляху
  const match = ctx.request.url.match(/^\/api\/(\w+)[\/\?]?/);
  if (!match) {
    return ctx.badRequest("Cannot determine collection type");
  }
  const map = {
    events: 'event',
    comments: 'comment',
    'user-profiles': 'user-profile',
  };
  let collection = map[match[1]] || match[1];

  // Якщо це events, шукаємо по documentId, інакше — по id
  let entity;
  if (collection === 'event') {
    const results = await strapi.entityService.findMany(`api::event.event`, {
      filters: { documentId: id },
      populate: ['owner'],
      limit: 1,
    });
    entity = results && results.length ? results[0] : null;
  } else {
    entity = await strapi.entityService.findOne(`api::${collection}.${collection}`, id, { populate: ['owner'] });
  }

  if (!entity) {
    return ctx.notFound("Resource not found");
  }

  if (!entity.owner || entity.owner.id !== user.id) {
    return ctx.forbidden("You are not the owner of this resource.");
  }

  return next();
}; 