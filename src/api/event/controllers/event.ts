import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::event.event', ({ strapi }) => ({
  async create(ctx) {
    if (!ctx.state.user) {
      return ctx.unauthorized("No user found in context");
    }

    // Знаходимо профіль поточного користувача
    const user = ctx.state.user;

    // Припустимо, що User Profile має зв'язок 1-1 з User (auth)
    const userProfiles = await strapi.entityService.findMany('api::user-profile.user-profile', {
      filters: { email: user.email },
      limit: 1,
    });

    if (!userProfiles || userProfiles.length === 0) {
      return ctx.badRequest('User profile not found');
    }

    const organizerId = userProfiles[0].id;

    // Додаємо organizer до події
    ctx.request.body.data.organizer = organizerId;

    // Викликаємо стандартний create
    // @ts-ignore
    return await super.create(ctx);
  },
}));