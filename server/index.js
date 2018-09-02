const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/', express.static(`${__dirname}/../public/dist`));

const port = 5222;

app.listen(port, () => {
  console.log(`Listening to on port ${port}`);
});
