const prisma = require('./lib/prisma');

async function main() {
  try {
    console.log('Connecting to DB...');
    await prisma.$connect();
    console.log('Connected.');
    
    console.log('Checking ContactMessage table...');
    const count = await prisma.contactMessage.count();
    console.log('ContactMessage count:', count);
    
    console.log('DB Check Passed.');
  } catch (e) {
    console.error('DB Check Failed:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
