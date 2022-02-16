import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  FormGroup,
  Form,
  FormControl,
  Button,
  Table,
} from 'react-bootstrap';

function App() {
  const [data, setData] = useState([
    {
      id: '',
      name: '',
      type: '',
    },
  ]);

  const getData = () => {
    Axios.get('http://localhost:3001/get').then((response) => {
      setData(response.data);
    });
  };

  return (
    <>
      <Container>
        <Form action="">
          <FormGroup>
            <label htmlFor="name">Name</label>
            <FormControl type="text" name="name" id="name" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="type">Type</label>
            <FormControl type="text" name="type" id="type" />
          </FormGroup>
          <Button variant="primary" type="submit" className="mt-2">
            send
          </Button>
        </Form>
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
