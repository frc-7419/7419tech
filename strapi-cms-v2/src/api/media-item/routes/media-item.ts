export default {
  routes: [
    {
      method: 'GET',
      path: '/media-items',
      handler: 'media-item.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/media-items/:id',
      handler: 'media-item.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
