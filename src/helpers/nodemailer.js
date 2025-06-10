import nodemailer from 'nodemailer';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis do arquivo .env

function sendEmail(newPassword, userEmail) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "giovanadossantos107@gmail.com",
            pass: "ecojihoxnkclipxq"
        }
    });

    let mailOptions = {
        from: "giovanadossanto107@gmail.com",
        to: userEmail,
        subject: 'Recuperação de Senha',
        html: getEmailTemplate(newPassword)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar e-mail: ', error);
        } else {
            console.log('E-mail enviado: ' + info.response);
        }
    });
}

const getEmailTemplate = (newPassword) => {
    const htmlTemplate = fs.readFileSync('./src/templates/changePassword.html', 'utf-8');
    return htmlTemplate.replace('{{newPassword}}', newPassword);
};

export { sendEmail };
