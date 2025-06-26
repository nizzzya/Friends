import { Policy } from '@strapi/types';

const allowEventOwner: Policy = async (ctx, config, { strapi }) => {
  const { id } = ctx.params;
  const user = ctx.state.user;

  if (!user) return false;

  const event = await strapi.entityService.findOne('api::event.event', id, {
    populate: { user: true },
  });

  if (!event) return false;

  return event.user && event.user.id === user.id;
};

export default allowEventOwner;