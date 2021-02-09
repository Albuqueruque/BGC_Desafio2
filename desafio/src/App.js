import './styles.css';

import {Container, Button, Form} from 'react-bootstrap';

import Amplify from "aws-amplify";
import { API } from 'aws-amplify';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

async function addContact() {
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
    <section class="page-section" id="contact">
          <div class="container">
              <div class="text-center">
                  <h2 class="section-heading text-uppercase">Reverse seu minion</h2>
                  <h3 class="section-subheading text-muted">Preencha o formulario a abaixo e nos informe qual minion você deseja</h3>
              </div>
              <form id="contactForm" name="sentMessage" novalidate="novalidate">
                  <div class="row align-items-stretch mb-5">
                      <div class="col-md-6">
                          <div class="form-group">
                              <input class="form-control" id="name" type="text" placeholder="Nome" required="required" data-validation-required-message="Nome"  onChange={e => updateFormState('name', e.target.value)} />
                              <p class="help-block text-danger"></p>
                          </div>
                          <div class="form-group">
                              <input class="form-control" id="email" type="email" placeholder="Email" required="required" data-validation-required-message="Email"  onChange={e => updateFormState('email', e.target.value)} />
                              <p class="help-block text-danger"></p>
                          </div>
                          <div class="form-group mb-md-0">
                              <input class="form-control" id="phone" type="tel" placeholder="Numero de telefone" required="required" data-validation-required-message="Numero de telefone" onChange={e => updateFormState('phone', e.target.value)} />
                              <p class="help-block text-danger"></p>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group form-group-textarea mb-md-0">
                              <textarea class="form-control" id="message" placeholder="Por favor insira seu pedido " required="required" data-validation-required-message="Por favor insira seu pedido"  onChange={e => updateFormState('message', e.target.value)}></textarea>
                              <p class="help-block text-danger"></p>
                          </div>
                      </div>
                  </div>
                  <div class="text-center">
                      <div id="success"></div>
                      <button class="btn btn-primary btn-xl text-uppercase" type="submit" onClick={addContact}>Fazer o pedido</button>
                  </div>
              </form>
          </div>
      </section>
    </Container>
  );
}

export default App;