const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/authMiddleware');

// Auth
router.post('/login', authController.login);

// Protected Routes
router.use(verifyToken);

// About & Hero
router.put('/about', adminController.updateAbout);

// Projects
router.post('/projects', adminController.createProject);
router.put('/projects/:id', adminController.updateProject);
router.delete('/projects/:id', adminController.deleteProject);

// Experiences
router.post('/experiences', adminController.createExperience);
router.put('/experiences/:id', adminController.updateExperience);
router.delete('/experiences/:id', adminController.deleteExperience);

// Skills
router.post('/skills', adminController.createSkill);
router.delete('/skills/:id', adminController.deleteSkill);

// Messages
router.get('/messages', adminController.getMessages);
router.delete('/messages/:id', adminController.deleteMessage);

module.exports = router;
