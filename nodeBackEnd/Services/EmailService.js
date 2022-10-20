const nodemailer = require("nodemailer");

const sendEmailToAdmin = (exchangeData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arcticexpressemails@gmail.com',
            pass: 'jijgdwhhdlliuasz'
        }
    })

    const mailOptions = {
        from: 'arcticexpressemails@gmail.com',
        to: exchangeData.exchangeEmail,
        subject: 'Arctic Express - ' + exchangeData.exchangeName,
        text: 'Here are the details of your gift exchange; \n'
            + 'Gift Exchange Date: ' + exchangeData.exchangeDate + '\n'
            + 'Admin URL - http://localhost:3000/organise/'+ exchangeData.adminUrl + ' (keep this one private)\n'
            + 'Participant URL - http://localhost:3000/join/' + exchangeData.participantUrl + ' (share this one around)\n\n'
            + 'Thanks for using our service! <3\n'
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

const sendEmail = (participant) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arcticexpressemails@gmail.com',
            pass: 'jijgdwhhdlliuasz'
        }
    })

    const mailOptions = {
        from: 'arcticexpressemails@gmail.com',
        to: participant.email,
        subject: 'Your gift exchange!',
        text: 'These are the details of your gift exchange! ' + participant.address
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

const sendEmailToParticipant = (participant, exchange) => {
    let mailOptions
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arcticexpressemails@gmail.com',
            pass: 'jijgdwhhdlliuasz'
        }
    })
    if(exchange.isPostal) {
        mailOptions = {
            from: 'arcticexpressemails@gmail.com',
            to: participant.email,
            subject: 'Your gift exchange!',
            text: 'Hi ' + participant.name + '!' + '\n\n' + 'Here are the details of the "' + exchange.exchangeName + '" gift exchange! \n'
                + 'You are sending to - '+ participant.recipient.name + ', make it a great gift!\n'
                + 'Make sure you send your gift so that it reaches ' + participant.recipient.name + ' by ' + exchange.exchangeDate + '!\n'
                + 'Their address is - ' + participant.recipient.address + '\n\n'
                + 'Thanks for using our service! <3\n'
        }
    } else {
        mailOptions = {
            from: 'arcticexpressemails@gmail.com',
            to: participant.email,
            subject: 'Your gift exchange!',
            text: 'Hi ' + participant.name + '!' + '\n\n' + 'Here are the details of the "' + exchange.exchangeName + '" gift exchange! \n'
                + 'You are sending to - '+ participant.recipient.name + ', make it a great gift!\n\n'
                + 'Thanks for using our service! <3\n'
        }
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = {
    sendEmailToAdmin: sendEmailToAdmin,
    sendEmail: sendEmail,
    sendEmailToParticipant: sendEmailToParticipant
}