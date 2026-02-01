const prisma = require('../lib/prisma');

async function main() {
  const oldEmail = 'admin@example.com';
  const newEmail = 'jayed08@gmail.com';

  try {
    const admin = await prisma.admin.findUnique({
      where: { email: oldEmail },
    });

    if (admin) {
      await prisma.admin.update({
        where: { email: oldEmail },
        data: { email: newEmail },
      });
      console.log(`Admin email updated from ${oldEmail} to ${newEmail}`);
    } else {
      console.log(`Admin with email ${oldEmail} not found. Checking if ${newEmail} already exists...`);
      const newAdmin = await prisma.admin.findUnique({ where: { email: newEmail } });
      if (newAdmin) {
          console.log(`Admin ${newEmail} already exists.`);
      } else {
          console.log("No admin found to update.");
      }
    }
  } catch (error) {
    console.error('Error updating admin email:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
