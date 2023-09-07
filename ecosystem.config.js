module.exports = {
  apps: [
    {
      name: 'BPMS',
      script: 'npm run start:prod',
      env: {
        NODE_ENV: 'prod',
      },
    },
    {
      name: 'BPMS update service',
      script: 'update.js',
    },
  ],
};
