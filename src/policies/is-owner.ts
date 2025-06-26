export default async (ctx: any, config: any, { strapi }: { strapi: any }) => {
  console.log("✅ is-owner policy (TS) is running");

  const user = ctx.state.user;
  const eventId = ctx.params.id;

  if (!user) {
    return ctx.unauthorized("You must be logged in.");
  }

  const event = await strapi.entityService.findOne("api::event.event", eventId, {
    populate: { organizer: true },
  });

  if (!event) {
    return ctx.notFound("Event not found.");
  }

  if (event.organizer.id !== user.id) {
    return ctx.forbidden("You are not the organizer of this event.");
  }

  return true;
};
