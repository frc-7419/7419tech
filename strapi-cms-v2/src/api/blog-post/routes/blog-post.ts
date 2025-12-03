export default {
  routes: [
    {
      method: 'GET',
      path: '/blog-posts',
      handler: 'api::blog-post.blog-post.find',
    },
    {
      method: 'GET',
      path: '/blog-posts/:documentId',
      handler: 'api::blog-post.blog-post.findOne',
    },
    {
      method: 'POST',
      path: '/blog-posts',
      handler: 'api::blog-post.blog-post.create',
    },
    {
      method: 'PUT',
      path: '/blog-posts/:documentId',
      handler: 'api::blog-post.blog-post.update',
    },
    {
      method: 'DELETE',
      path: '/blog-posts/:documentId',
      handler: 'api::blog-post.blog-post.delete',
    },
  ],
};
