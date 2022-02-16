import { useState } from 'react';
import Axios from 'axios';

import './app.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FormGroup, FormControl, Button, Table } from 'react-bootstrap';

function App() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const [data, setData] = useState([
    {
      id: 0,
      name: '',
      type: '',
    },
  ]);

  const getData = () => {
    Axios.get('http://localhost:3001/get').then((response) => {
      setData(response.data);
    });
  };

  const addData = () => {
    Axios.post('http://localhost:3001/post', {
      name: name,
      type: type,
    }).then(getData);
  };

  const updateData = () => {
    Axios.put('http://localhost:3001/update', {
      name: name,
      type: type,
      id: Number(id),
    }).then(getData);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="mt-2">
          <Table>
            <thead style={{ display: 'block' }}>
              <tr
                style={{
                  display: 'block',
                  width: '100%',
                }}
              >
                <th scope="col" id="id">
                  id
                </th>
                <th scope="col" id="name">
                  Name
                </th>
                <th scope="col" id="type">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {data.map((data, key) => {
                return (
                  <tr
                    key={key}
                    style={{
                      display: 'block',
                      width: '100%',
                    }}
                  >
                    <th scope="row" id="id">
                      {data.id}
                    </th>
                    <td id="name">{data.name}</td>
                    <td id="type">{data.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="mt-4 controls">
          <label htmlFor="id">Id</label>
          <FormControl
            type="text"
            name="id"
            id="id"
            style={{
              width: '100px',
            }}
            onChange={({ target }) => {
              setId(target.value);
            }}
          />

          <label htmlFor="name">Name</label>
          <FormControl
            type="text"
            name="name"
            id="name"
            style={{
              width: '250px',
            }}
            onChange={({ target }) => {
              setName(target.value);
            }}
          />

          <label htmlFor="type">Type</label>
          <FormControl
            type="text"
            name="type"
            id="type"
            style={{
              width: '250px',
            }}
            onChange={({ target }) => {
              setType(target.value);
            }}
          />

          <Button variant="primary" onClick={addData}>
            Add item
          </Button>
          <Button variant="primary" onClick={getData}>
            Get data
          </Button>
          <Button variant="primary" onClick={updateData}>
            Update
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
