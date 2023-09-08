/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */

const { exec } = require('child_process');
const app = require('express')();

const projectName = require('./package.json').name;
const port = 7777;

let restartService = true;

app.all('/updateBE', async (req, res) => {
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
        res.send(stdout);
      },
    );
    resolve(stdout);
  });

  await updateApp;

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
      res.send(stdout);
      resolve(stdout);
    });
  });

  await restartPm2;
});

app.listen(port, () =>
  console.log(
    `update service for project:${projectName} is running on ${port}`,
  ),
);
