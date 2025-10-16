export default {
  routes: [
    {
      method: 'GET',
      path: '/student-leaders',
      handler: 'student-leader.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/student-leaders/:id',
      handler: 'student-leader.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
