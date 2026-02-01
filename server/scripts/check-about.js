const prisma = require('../lib/prisma');

async function main() {
  const about = await prisma.about.findFirst();
  console.log('About Data:', about);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });