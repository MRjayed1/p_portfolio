const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');

async function main() {
  console.log('Seeding admin and updating about...');

  // 1. Create Admin
  const email = 'admin@example.com';
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
    },
  });
  console.log('Admin created:', admin.email);

  // 2. Update About with Hero fields
  const about = await prisma.about.findFirst();
  if (about) {
    await prisma.about.update({
      where: { id: about.id },
      data: {
        cvUrl: about.cvUrl || "https://example.com/cv.pdf",
        heroHiddenText: about.heroHiddenText || "Hi I'm Jayed",
        heroPrimaryText: about.heroPrimaryText || "A Developer Dedicated to Crafting",
        heroSecondaryText: about.heroSecondaryText || "Web Solutions",
        heroFlipWords: about.heroFlipWords.length > 0 ? about.heroFlipWords : ["Secure", "Modern", "Scalable"],
      },
    });
    console.log('About updated with Hero fields');
  } else {
    console.log('No About record found to update.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
