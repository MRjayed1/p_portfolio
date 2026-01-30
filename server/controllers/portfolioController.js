const prisma = require('../lib/prisma');

exports.getPortfolioData = async (req, res) => {
  try {
    const [about, projects, skills, experiences, testimonials, socials] = await Promise.all([
      prisma.about.findFirst(),
      prisma.project.findMany({
        include: { tags: true },
        orderBy: { id: 'asc' }
      }),
      prisma.skill.findMany(),
      prisma.experience.findMany({ orderBy: { id: 'asc' } }),
      prisma.testimonial.findMany(),
      prisma.social.findMany(),
    ]);

    res.json({
      about,
      projects,
      skills,
      experiences,
      testimonials,
      socials
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
};
