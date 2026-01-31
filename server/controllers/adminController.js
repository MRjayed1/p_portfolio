const prisma = require('../lib/prisma');

// ABOUT & HERO
exports.updateAbout = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    // Ensure we update the correct record. We assume there's only one 'About' record usually, 
    // but passing ID is safer if frontend knows it.
    // If no ID, findFirst.
    
    let aboutId = id;
    if (!aboutId) {
        const first = await prisma.about.findFirst();
        if (first) aboutId = first.id;
    }

    if (!aboutId) {
        // Create if doesn't exist?
        const newAbout = await prisma.about.create({ data });
        return res.json(newAbout);
    }

    const updated = await prisma.about.update({
      where: { id: parseInt(aboutId) },
      data: data,
    });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update About' });
  }
};

// PROJECTS
exports.createProject = async (req, res) => {
  try {
    const { tags, ...data } = req.body;
    // tags is array of IDs or names? Frontend should send array of IDs or objects.
    // Let's assume we handle tags via relation.
    // If tags are simple strings (skill names) or IDs?
    // The schema says: tags Skill[] @relation("ProjectSkills")
    // Let's assume tags is an array of skill IDs for simplicity in Admin UI, 
    // OR we can create/connect skills.
    
    // For simplicity: We expect tags to be an array of Skill IDs to connect.
    const connectTags = tags ? tags.map(tagId => ({ id: parseInt(tagId) })) : [];

    const project = await prisma.project.create({
      data: {
        ...data,
        tags: { connect: connectTags }
      },
      include: { tags: true }
    });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { tags, ...data } = req.body;

    // Handle tags update (disconnect all, then connect new)
    // Or smart update.
    // Simplest: set (replace).
    
    const updateData = { ...data };
    
    if (tags) {
        const connectTags = tags.map(tagId => ({ id: parseInt(tagId) }));
        updateData.tags = { set: connectTags };
    }

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: { tags: true }
    });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

// EXPERIENCES
exports.createExperience = async (req, res) => {
  try {
    const experience = await prisma.experience.create({ data: req.body });
    res.json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create experience' });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await prisma.experience.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update experience' });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete experience' });
  }
};

// SKILLS
exports.createSkill = async (req, res) => {
  try {
    const skill = await prisma.skill.create({ data: req.body });
    res.json(skill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create skill' });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
};

// MESSAGES
exports.getMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};
