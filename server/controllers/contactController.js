const prisma = require('../lib/prisma');

exports.submitContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
