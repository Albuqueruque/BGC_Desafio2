import './styles.css';

import {Container, Button, Form} from 'react-bootstrap';

import Amplify from "aws-amplify";
import { API } from 'aws-amplify';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

async function addContact() {
  console.log('É ELE');
  const data = {
    body: {
      name: formState.name,
      email: formState.email,
      message: formState.message,
      phone: formState.phone
    }
  };

  console.log(data);
  const apiData = await API.post('formapi', '/contact', data);
  console.log({ apiData });
  alert('Pedido enviado com sucesso!');
}

const formState = { name: '', email: '', message: '' , phone:''};

function updateFormState(key, value) {
  formState[key] = value;
}

function App() {
  return (
    <Container>
    <section className="page-section" id="contact">
          <div className="container">
              <div className="text-center">
                  <h2 className="section-heading text-uppercase">Reserve seu minion</h2>
                  <h3 className="section-subheading text-muted">Preencha o formulario a abaixo e nos informe qual minion você deseja</h3>
              </div>
              <form id="contactForm" name="sentMessage" noValidate="noValidate">
                  <div className="row align-items-stretch mb-5">
                      <div className="col-md-6">
                          <div className="form-group">
                              <input className="form-control" id="name" type="text" placeholder="Nome" required="required" data-validation-required-message="Nome"  onChange={e => updateFormState('name', e.target.value)} />
                              <p className="help-block text-danger"></p>
                          </div>
                          <div className="form-group">
                              <input className="form-control" id="email" type="email" placeholder="Email" required="required" data-validation-required-message="Email"  onChange={e => updateFormState('email', e.target.value)} />
                              <p className="help-block text-danger"></p>
                          </div>
                          <div className="form-group mb-md-0">
                              <input className="form-control" id="phone" type="tel" placeholder="Numero de telefone" required="required" data-validation-required-message="Numero de telefone" onChange={e => updateFormState('phone', e.target.value)} />
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group form-group-textarea mb-md-0">
                              <textarea className="form-control" id="message" placeholder="Por favor insira seu pedido " required="required" data-validation-required-message="Por favor insira seu pedido"  onChange={e => updateFormState('message', e.target.value)}></textarea>
                              <p className="help-block text-danger"></p>
                          </div>
                      </div>
                  </div>
                  <div className="text-center">
                      <div id="success"></div>
                      <button className="btn btn-primary btn-xl text-uppercase" type="submit" onClick={addContact}>Fazer o pedido</button>
                  </div>
              </form>
          </div>
      </section>
    </Container>
  );
}

export default App;