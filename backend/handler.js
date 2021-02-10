const AWS = require('aws-sdk');
const SES = new AWS.SES();

const FROM_EMAIL_ADDRESS = process.env.FROM_EMAIL_ADDRESS;
const TO_EMAIL_ADDRESS = process.env.TO_EMAIL_ADDRESS;

function sendEmailToMe(formData) {

    const emailParams = {
        Source: FROM_EMAIL_ADDRESS, 
        ReplyToAddresses: ['testReply@email.com'],
        Destination: {
          ToAddresses: [TO_EMAIL_ADDRESS], 
        },
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: `Olá! ${formData.name},\n\n Obrigado pelo seu interesse por nossos minions, nos recebemos a seguinte mensagem enviada por você:\n\n ${formData.message}\n\n Estaremos retornando a mensagem para o email: ${formData.email}\n  Assim que tivermos mais avances lhe informaremos \n Atenciosamente, \n -- Matheus` },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Desafio BGC Etapa 2',
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
        email : dynamodb.NewImage.email.S
    }
    console.log(formData);

    return sendEmailToMe(formData).then(data => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    });
}