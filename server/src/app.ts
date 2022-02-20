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
    (err) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).send('Row added successfully');
      }
    },
  );
});

app.get('/get', (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(result);
    }
  });
});

app.put('/update', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const type = req.body.type;

  db.query(
    'UPDATE products SET name = ?, type = ? WHERE id = ?',
    [name, type, id],
    (err) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).send('Row updated successfully');
      }
    },
  );
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM products WHERE id = ?', id, (err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send('Row deleted successfully');
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello there');
});

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
