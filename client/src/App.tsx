import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  FormGroup,
  FormControl,
  Button,
  Table,
} from 'react-bootstrap';

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

  return (
    <>
      <Container>
        <div className="col-6 mt-4">
          <h3>Add</h3>
          <FormGroup>
            <label htmlFor="name">Name</label>
            <FormControl
              type="text"
              name="name"
              id="name"
              onChange={({ target }) => {
                setName(target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="type">Type</label>
            <FormControl
              type="text"
              name="type"
              id="type"
              onChange={({ target }) => {
                setType(target.value);
              }}
            />
          </FormGroup>
          <Button variant="primary" className="mt-2" onClick={addData}>
            Add item
          </Button>
        </div>
      </Container>
      <Container>
        <Button variant="primary" className="mt-5 mb-2" onClick={getData}>
          Get data
        </Button>
      </Container>
      <Container>
        <Table>
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{data.id}</th>
                  <td>{data.name}</td>
                  <td>{data.type}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default App;
