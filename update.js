/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */

const { exec } = require('child_process');
const app = require('express')();

const projectName = require('./package.json').name;
const port = 7777;

let restartService = true;

const updateApp = new Promise((resolve, reject) => {
  exec(
    `git --git-dir='${process.cwd()}/.git' --work-tree=${process.cwd()} pull`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (stderr) {
        console.log(stderr);
        reject(stderr);
      }
      if (stdout == 'Already up to date.') restartService = false;
      resolve(stdout);
    },
  );
});

const restartPm2 = new Promise((resolve, reject) => {
  if (!restartService) return;

  exec(`pm2 restart ${projectName}`, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      reject(err);
    }
    if (stderr) {
      console.log(stderr);
      reject(stderr);
    }
    console.log(`Project ${projectName} restarted`);
    resolve(stdout);
  });
});

app.all('/updateBE', async (req, res) => {
  const updateResult = await updateApp();
  res.send(updateResult);

  const restartResult = await restartPm2();
  console.log(restartResult);
});

app.listen(port, () =>
  console.log(
    `update service for project:${projectName} is running on ${port}`,
  ),
);
