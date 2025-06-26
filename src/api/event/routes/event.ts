export default [
  {
    method: 'PUT',
    path: '/events/:id',
    handler: 'event.update',
    config: {
      policies: ['api::event.allow-event-owner'],
    },
  },
  {
    method: 'DELETE',
    path: '/events/:id',
    handler: 'event.delete',
    config: {
      policies: ['api::event.allow-event-owner'],
    },
  },
  // ...інші роутери
];