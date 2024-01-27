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
            <b>Note: You are not making the payment with the link. </b> </p>
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
  
    res.status(200).json({message: 'successful', totalUser: users.length, users});
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.deleteDuplicateUser = async (req, res) => {
  try {
    const users = await User.find({}, "_id, email");
    const unifiedEmails = users.map((user) => user.email.toLowerCase()); //convert all emails to lower case
    const userWithSingleEmails = [];
    const usersWithDuplicateInfo = []

    for (const user of users) { //
      if (!userWithSingleEmails.includes(user.email)) {
        userWithSingleEmails.push(user.email); //add one user once only to this list
      }
      else usersWithDuplicateInfo.push(user);//add the user object with duplicate info to the list
    }
    //collect all one of the Ids of duplicates users with duplicate info
    const duplicateUserIds   = usersWithDuplicateInfo.map(user => user._id)
   //delete duplicates users
    await User.deleteMany({_id: {$in: duplicateUserIds}})
    res.
    status(200)
    .json(
      {message:'success', totalSingleUsers: userWithSingleEmails.length,
    totalDoubleUsers: usersWithDuplicateInfo.length, users: usersWithDuplicateInfo}
    );
  } 
  
  
  catch (err) {
    console.error(err);
    res.status(500).json({error: err.message})
  }
};

exports.deleteUsers = async (req, res) => {
  try{
    const valuesToDelete = req.body.users
    const users = await User.find({})
     await User.deleteMany({firstName: 'Faruq'})
     await User.deleteMany({firstName: 'faruq'})
     await User.deleteMany({lastName: 'Hameed'})
     await User.deleteMany({lastName: 'hameed'})
     res.status(200).send('deleting successful')
  }
 catch (err){
  console.error('failed to delete', {error: err})
  res.status(500).send('error deleting users')
 }
}

exports.sendBulkEmails = async (req, res) => {
  try{
    // Define your list of candidates
const candidates = [
  { name: 'Faruq Hameed', email: 'faruq@ruqtec.com' },
  { name: 'Ruqtec Ruqtec', email: 'faruqhameed1@gmail.com' },
  // Add more candidates here
];
// Define your email configuration
const transporter = nodemailer.createTransport({
  service: 'ruqtec.com', // e.g., 'Gmail'
  port: 465,
      secure: true,
  auth: {
    user: process.env.CAREER_EMAIL,
    pass: process.env.CAREER_PASS,
  },
});

// Define the email content as HTML
function createEmail(candidate) {
  const emailContent = `
    <html>
    <body>
      <p><strong>Subject:</strong> Invitation to Ruqtec EdTech Institute Data Science Tutor Technical Quiz</p>
      <p>Dear ${candidate.name},</p>
      <p>I hope this message finds you well. We are delighted to inform you that you have been shortlisted for the position of Data Science Tutor at Ruqtec EdTech Institute. Congratulations on reaching this stage of the selection process!</p>
      <p>As a next step in our evaluation, we would like to invite you to participate in our technical quiz. This quiz is a crucial part of our assessment process and will help us gauge your technical knowledge and problem-solving skills, which are essential for success in this role.</p>
      <p>The technical quiz will be sent to you shortly, so please keep an eye on your email inbox. We kindly request that you complete the quiz as soon as possible, as any delay in taking the quiz may affect the progress of your application with us. Please set aside some uninterrupted time to complete the quiz, ensuring that you have a stable internet connection.</p>
      <p>Here are a few details about the technical quiz:</p>
      <ul>
        <li>The quiz will be sent to you via email.</li>
        <li>You will have a specified time limit to complete the quiz, which will be mentioned in the email.</li>
        <li>Please make sure to read the instructions carefully before starting the quiz.</li>
        <li>You may use relevant reference materials, but the majority of the quiz should reflect your individual skills and knowledge.</li>
      </ul>
      <p>We are looking to make a decision as soon as possible, and your prompt completion of the technical quiz will greatly assist us in expediting the selection process. After successfully passing the quiz, you will proceed to the final interview stage.</p>
      <p>Should you have any questions or require any clarifications regarding the quiz or the overall recruitment process, please do not hesitate to reach out to us at [Your Contact Email].</p>
      <p>Once again, congratulations on your selection for this opportunity. We are excited about the possibility of you joining our team at Ruqtec EdTech Institute.</p>
      <p>Thank you for your continued interest in our organization, and we look forward to your prompt response to the technical quiz.</p>
      <p>Best regards,</p>
      <p>${candidate.name}</p>
      <p>Your Title</p>
      <p>Ruqtec EdTech Institute</p>
      <p>Your Contact Information</p>
    </body>
    </html>
  `;

  return {
    from: 'Your Name <your@email.com>',
    to: candidate.email,
    subject: 'Invitation to Ruqtec EdTech Institute Data Science Tutor Technical Quiz',
    html: emailContent, // Specify content as HTML
  };
}
// Define an asynchronous function to send emails
    // Send emails to each candidate
     for (const candidate of candidates) {
      const mailOptions = createEmail(candidate);

      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${candidate.email}`);

}
res.status(200).send("Email sent successfully")

  }
  catch(err){
    console.error(err);
    res.status(400).send(err.message);
  }
}


