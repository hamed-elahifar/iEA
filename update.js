/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */

const { exec } = require('child_process');
const app = require('express')();

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
        res.send(stdout);
      },
    );
    resolve(stdout);
  });

  await updateApp;

  const restartPm2 = new Promise((resolve, reject) => {
    exec(`pm2 restart bpms`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (stderr) {
        console.log(stderr);
        reject(stderr);
      }
      res.send(stdout);
      resolve(stdout);
    });
  });

  await restartPm2;
});

const port = 7777;
app.listen(port, () => console.log(`update service is running on ${port}`));
