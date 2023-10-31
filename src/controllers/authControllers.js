const {User} = require('../db');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const {validatedUserJoiSchema} = require('../utils/userJoiSchema')

exports.register = async (req, res, next) => {
  try {
    // Create a new user
    const validation = validatedUserJoiSchema(req.body)
    if (validation.error) {
        res.status(422).json(validation.error.details[0].message);
        return;
      }
      // const doesEmailAlreadyExist = await User.findOne({ email: validation.value.email}, '_id');
      // if (doesEmailAlreadyExist) {
      //   return res.status(404).json({ message: "email already exists" });
      // }
    const newUser = await User.create({...validation.value})
    req.newUser = newUser //to passed to the next middleware

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
        name: newUser.firstName + ' ' + newUser.lastName,
        intro: "Welcome to Ruqtec! We're very excited to have you on board.",
        action: {
          instructions:
            `<p> Kindly click the button below to choose your payment mode. 
            <b>Note: you are not making the payment with the link</b> </p>
            <p> If you already filled the payment form, you can ignore this action and expect further instructions from us within the next 48 business hours`,
          button: {
            color: "#0797DE", // Optional action button color
            text: "<b>Payment Mode Link</b>",
            link: 'https://forms.gle/1JhiukRzJ1MoUtSi6'
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
    let course = newUser.course;
    course = course.charAt(0).toUpperCase() + course.slice(1);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [newUser.email, 
        // process.env.EMAIL_USER
      ],
      subject: `Application for ${course} Received`,
      html: emailTemplate,
    };
    await transporter.sendMail(mailOptions);

    next();

    // res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.notifyAdmin = async (req, res) => {
  try {
    
    const newUser = req.newUser;
    // Send confirmation email
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'RUQTEC',
        link: 'https://ruqtec.com',
        logo: 'https://ruqtec.com/Images/logo.png'
      },
    });
    let course = newUser.course;
    course = course.charAt(0).toUpperCase() + course.slice(1);
    const email = {
      body: {
        name: 'Ruqtec Admission Team',
        intro:`A new student just applied for a course. The applicant details are available below; `,
        action: {
          instructions:
           `<b>Applicant Name</b>: ${newUser.firstName + ' ' + newUser.lastName}. \n 
           <b>email</b>: ${newUser.email} \n <b>phone:</b> ${newUser.phoneNumber} \n <b>course:<b/> ${course} `,
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
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Another Application Received for <b>${course}<br/>`,
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUsers = async (req, res)=>{
  try{
    const users = await User.find({})
    .sort({ createdAt: -1 })
  
    res.status(200).json({message: 'succesfull', users});
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.deleteUsers = async (req, res) => {
  const valuesToDelete = req.body.users
  const users = await User.find({})
   await User.deleteMany({firstName: 'Faruq'})
   await User.deleteMany({firstName: 'faruq'})

}