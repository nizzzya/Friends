import { Policy } from '@strapi/types';

const allowEventOwner: Policy = async (ctx, config, { strapi }) => {
  const { id } = ctx.params;
  const user = ctx.state.user;

  if (!user) return false;

  // Знаходимо профіль поточного користувача
  const userProfiles = await strapi.entityService.findMany('api::user-profile.user-profile', {
    filters: { email: user.email },
    limit: 1,
  });

  if (!userProfiles || userProfiles.length === 0) return false;

  const profileId = userProfiles[0].id;

  // Отримуємо подію разом із organizer
  const event = await strapi.entityService.findOne('api::event.event', id, {
    populate: { organizer: true },
  });

  if (!event) return false;

  // organizer.id === поточний user profile id
  return event.organizer && event.organizer.id === profileId;
};

export default allowEventOwner;