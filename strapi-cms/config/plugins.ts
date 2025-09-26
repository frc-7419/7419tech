export default () => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 100000000, // 100MB
      },
    },
  },
});
