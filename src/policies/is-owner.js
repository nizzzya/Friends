module.exports = async (ctx, next) => {
  const user = ctx.state.user;
  if (!user) {
    return ctx.unauthorized("You must be logged in.");
  }

  const { id } = ctx.params;
  if (!id) {
    return ctx.badRequest("Missing resource id");
  }

  // Витягуємо тип колекції з шляху, наприклад /api/events/:id
  const match = ctx.request.url.match(/^\/api\/(\w+)[\/\?]?/);
  if (!match) {
    return ctx.badRequest("Cannot determine collection type");
  }
  const collection = match[1].replace(/-/g, '_'); // event, comment, user_profile

  // Отримуємо ресурс
  const entity = await strapi.entityService.findOne(`api::${collection}.${collection}`, id, { populate: ['owner'] });
  if (!entity) {
    return ctx.notFound("Resource not found");
  }

  // Перевіряємо власника
  if (!entity.owner || entity.owner.id !== user.id) {
    return ctx.forbidden("You are not the owner of this resource.");
  }

  // Все гаразд, передаємо далі
  return next();
}; 