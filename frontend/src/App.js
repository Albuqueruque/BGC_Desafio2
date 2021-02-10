import './App.css';

import {Container, Button, Form} from 'react-bootstrap';

import Amplify from "aws-amplify";
import { API } from 'aws-amplify';

const awsExports = {
  "aws_project_region": "us-east-1",
  "aws_dynamodb_all_tables_region": "us-east-1",
  "aws_dynamodb_table_schemas": [
      {
          "tableName": "formtable-dev",
          "region": "us-east-1"
      }
  ],
  "aws_cloud_logic_custom": [
      {
          "name": "formapi",
          "endpoint": "https://ocsp10l8hd.execute-api.us-east-1.amazonaws.com/dev",
          "region": "us-east-1"
      }
  ]
};
Amplify.configure(awsExports);

async function addContact() {
  const data = {
    body: {
      name: formState.name,
      email: formState.email,
      message: formState.message
    }
  };

  console.log(data);
  const apiData = await API.post('formapi', '/contact', data);
  console.log({ apiData });
  alert('Mail sent');
}

const formState = { name: '', email: '', message: '' };

function updateFormState(key, value) {
  formState[key] = value;
}

function App() {
  return (
    <Container>
    <div>
      <h3>Reserve seu minion</h3>
      <br/>
        <Form>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control placeholder="Nome" onChange={e => updateFormState('name', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Email" onChange={e => updateFormState('email', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Pedido</Form.Label>
            <Form.Control placeholder="Mensagem" onChange={e => updateFormState('message', e.target.value)} />
          </Form.Group>
          <Button onClick={addContact}>Enviar Pedido</Button>
        </Form>
      </div>
    </Container>
  );
}

export default App;