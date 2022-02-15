import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const PORT = 3001;
const app = express();

const db = mysql.createConnection({
  user: 'user',
  host: 'localhost',
  password: 'password',
  database: 'database',
});

app.use(cors());
app.use(express.json());

app.get('/get', (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello there');
});

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
