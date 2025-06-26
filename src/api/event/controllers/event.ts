import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::event.event', ({ strapi }) => ({
  async create(ctx) {
    ctx.request.body.data.user = ctx.state.user.id;
    return await super.create(ctx);
  }
}));