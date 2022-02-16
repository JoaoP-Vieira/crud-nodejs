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

app.post('/post', (req, res) => {
  const name = req.body.name;
  const type = req.body.type;

  db.query(
    'INSERT INTO products (name, type) VALUES (?,?)',
    [name, type],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('done');
      }
    },
  );
});

app.get('/get', (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/update', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const type = req.body.type;

  db.query(
    'UPDATE products SET name = ? WHERE type = ? WHERE id = ?',
    [name, type, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    },
  );
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM products WHERE id = ?', id, (err, result) => {
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
