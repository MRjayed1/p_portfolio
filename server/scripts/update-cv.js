const path = require('path');
process.env.DATABASE_URL = "postgresql://postgres:postgresql123@localhost:5432/portfolio?schema=public";
const prisma = require('../lib/prisma');

async function main() {
  const about = await prisma.about.findFirst();
  if (about) {
    await prisma.about.update({
      where: { id: about.id },
      data: { cvUrl: '/resume.pdf' } // Ensure it starts with /
    });
    console.log('CV URL updated to /resume.pdf');
  } else {
    console.log('No About record found to update.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });