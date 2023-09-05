/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */

const { exec } = require('child_process');
const app = require('express')();

app.all('/update', (req, res) => {
  exec(
    "git --git-dir='/root/tickado/public/.git' --work-tree=/root/tickado/public/ pull",
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      if (stderr) {
        console.log(stderr);
      }
      res.send(stdout);
    },
  );
});

const port = 7777;
app.listen(port, () => console.log(`update service is running on ${port}`));
