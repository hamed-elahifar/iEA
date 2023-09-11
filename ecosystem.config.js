module.exports = {
  apps: [
    {
      name: 'BPMS',
      script: 'npm run prod',
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
