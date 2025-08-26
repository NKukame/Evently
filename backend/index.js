import express from 'express';
import REST_API from './apis.js';

const app = express();

const port = 3000;
app.use(REST_API);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});