const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_change_me';

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const passwordIsValid = await bcrypt.compare(password, admin.password);

    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: admin.id }, JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).json({ auth: true, token, email: admin.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};
