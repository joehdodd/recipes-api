import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).send({
    success: 'true',
    statusText: 'hello world!',
  })
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Recipes API running on port ${PORT}. 💻`)
});
