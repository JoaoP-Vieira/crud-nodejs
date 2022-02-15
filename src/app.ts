import express from 'express';

const PORT = 3001;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello there');
});

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
