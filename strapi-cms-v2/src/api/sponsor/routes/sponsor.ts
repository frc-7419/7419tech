export default {
  routes: [
    {
      method: 'GET',
      path: '/sponsors',
      handler: 'sponsor.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/sponsors/:id',
      handler: 'sponsor.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
