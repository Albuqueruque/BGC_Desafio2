
const AWS = require('aws-sdk');
const SES = new AWS.SES();

const FROM_EMAIL_ADDRESS = process.env.FROM_EMAIL_ADDRESS;
const TO_EMAIL_ADDRESS = process.env.TO_EMAIL_ADDRESS;



function id(){
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  
  function sendEmailToMe(formData) {
  
    const emailParams = {
        Source: FROM_EMAIL_ADDRESS, 
        ReplyToAddresses: [formData.email], 
        Destination: {
          ToAddresses: [TO_EMAIL_ADDRESS], 
        },
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: `Obrigado pelo pedido: ${formData.message}\n\n Name: ${formData.name}\n Email: ${formData.email}\n Assim que possivel retornarei com atualizações do pedido\n Atenciosamente, \n -- Matheus`,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Desafio BGC Brasil pedido de Minions',
          },
        },
    };
  
    console.log(emailParams)
  
    const promise =  SES.sendEmail(emailParams).promise();
    console.log(promise);
    return promise
  }
  
  
  exports.sendEmail = async(event) => {
    console.log('Send email called');
  
    const dynamodb = event.Records[0].dynamodb;
    console.log(dynamodb);
  
    const formData = {
        name : dynamodb.NewImage.name.S,
        message : dynamodb.NewImage.message.S,
        email : dynamodb.NewImage.email.S,
        phone : dynamodb.NewImage.phone.S
    }
    console.log(formData);
  
    return sendEmailToMe(formData).then(data => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    });
  }