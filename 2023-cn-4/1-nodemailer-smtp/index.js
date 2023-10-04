const nodemailer = require("nodemailer");

// This is a complete example to send an email with plain text and HTML body using Forward Email.
// Source: https://nodemailer.com/about/

// SMTP transport: https://nodemailer.com/smtp/
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    // Opret en Gmail-konto, for eksempel joejuice2023@gmail.com: https://accounts.google.com/
    // Brug et random password til Gmail-kontoen, for eksempel joecbs2023
    // Tilføj to-faktor authentication til Gmail-kontoen via et telefonnummer: https://myaccount.google.com/signinoptions/two-step-verification/enroll-welcome
    // Opret et app password til Gmail-kontoen: https://myaccount.google.com/apppasswords
    // Fjern mellemrum i app password og brug det til at sende mails via Gmail SMTP

    // Mikkel har oprettet denne konto, så brug den kun til at afprøve, og ikke spam
    // Husk at indsætte modtager email adresser under "to" i funktionen mailToUser
    user: "tobi293dk@gmail.com",
    pass: "ylmlihqngygsarff",
  },
});

// Øvelse 1: Send en mail til dig selv med nodemailer via Gmail
// Se ovenstående under auth for oprettelse af Gmail-konto

async function mailToUser(target, subject, message, html) {
  // send mail with defined transport object
  // SMTP transport: https://nodemailer.com/smtp/
  const info = await transporter.sendMail({
    // Message configuration: https://nodemailer.com/message/
    from: "ME <tobi293dk@gmail.com>", // sender address
    to: [target], // list of reciever addresses
    subject: subject, // subject line
    text: message, // plain text body
    html: `<${html}>${message}</${html}>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

// Øvelse 2: Kald funktionen mailToUser med parametre og opdater funktionen mailToUser så den tager imod parametre
// to, subject, text og html

mailToUser("taarnon@protonmail.com","test2","lorem ipsum","h1").catch(console.error);