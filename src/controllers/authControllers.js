const {User} = require('../db');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const {validatedUserJoiSchema} = require('../utils/userJoiSchema')

exports.register = async (req, res) => {
  try {
    // Create a new user
    const validation = validatedUserJoiSchema(req.body)
    if (validation.error) {
        res.status(422).json(validation.error.details[0].message);
        return;
      }
    const newUser = await User.create({...validation.value})

    // Send confirmation email
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'RUQTEC',
        link: 'https://ruqtec.com',
        logo: 'https://ruqtec.com/Images/logo.png'
      },
    });

    const email = {
      body: {
        name: newUser.firstName + newUser.lastName,
        intro: "Welcome to Ruqtec! We're very excited to have you on board.",
        action: {
          instructions:
            "Kindly be on look out as we will email you in the next 48hrs on further instructions. Only via this email address.",
          button: {
            color: "blue", // Optional action button color
            text: "RUQTEC",
            // link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
          },
        },
        outro: "Need help, or have questions? Just reply to this email or  +2348061718441, we'd love to help.",
      },
    };

    const emailTemplate = mailGenerator.generate(email);
    const transporter = nodemailer.createTransport({
      host: "ruqtec.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'dev@ruqtec.com',
      to: newUser.email,
      subject: `Application for${newUser.course} received`,
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
