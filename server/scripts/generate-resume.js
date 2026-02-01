const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const prisma = require('../lib/prisma');

async function generateResume() {
  console.log('Generating Resume...');

  try {
    // 1. Fetch Data
    const about = await prisma.about.findFirst();
    const skills = await prisma.skill.findMany();
    const experiences = await prisma.experience.findMany({ orderBy: { id: 'desc' } });
    const projects = await prisma.project.findMany({ include: { tags: true }, orderBy: { id: 'asc' } });

    if (!about) {
      console.error('No About data found!');
      return;
    }

    // 2. Create PDF
    const doc = new PDFDocument({ margin: 50 });
    const outputPath = path.join(__dirname, '../../public/resume.pdf');
    const writeStream = fs.createWriteStream(outputPath);

    doc.pipe(writeStream);

    // --- Header ---
    doc.fontSize(25).text(about.name, { align: 'center' });
    doc.fontSize(12).text(about.title, { align: 'center' });
    doc.fontSize(10).text(`${about.location} | ${about.email}`, { align: 'center' });
    doc.moveDown();
    doc.moveDown();

    // --- Profile ---
    doc.fontSize(16).text('Profile', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11).text(about.description || about.subTitle, { align: 'justify' });
    doc.moveDown();

    // --- Skills ---
    doc.fontSize(16).text('Skills', { underline: true });
    doc.moveDown(0.5);
    const skillNames = skills.map(s => s.name).join(' • ');
    doc.fontSize(11).text(skillNames);
    doc.moveDown();

    // --- Experience ---
    doc.fontSize(16).text('Experience', { underline: true });
    doc.moveDown(0.5);
    experiences.forEach(exp => {
      doc.fontSize(12).text(`${exp.title} at ${exp.company}`, { bold: true });
      doc.fontSize(10).text(exp.date, { italic: true });
      doc.moveDown(0.2);
      if (exp.contents && exp.contents.length > 0) {
        exp.contents.forEach(point => {
          doc.text(`• ${point}`, { indent: 10 });
        });
      }
      doc.moveDown();
    });

    // --- Projects ---
    doc.fontSize(16).text('Projects', { underline: true });
    doc.moveDown(0.5);
    projects.forEach(proj => {
      doc.fontSize(12).text(proj.title, { bold: true });
      if (proj.href) {
        doc.fontSize(10).fillColor('blue').text(proj.href, { link: proj.href });
        doc.fillColor('black');
      }
      doc.moveDown(0.2);
      doc.fontSize(11).text(proj.description);
      
      // Tech stack
      if (proj.tags && proj.tags.length > 0) {
        doc.fontSize(10).text(`Tech: ${proj.tags.map(t => t.name).join(', ')}`, { italic: true });
      }
      doc.moveDown();
    });

    // End Document
    doc.end();

    // 3. Update Database with new URL
    writeStream.on('finish', async () => {
      console.log('PDF generated successfully at:', outputPath);
      
      // We want the URL to be relative to the public root
      const publicUrl = '/resume.pdf'; 
      
      await prisma.about.update({
        where: { id: about.id },
        data: { cvUrl: publicUrl }
      });
      console.log(`Database updated. CV URL set to: ${publicUrl}`);
      
      // Disconnect
      await prisma.$disconnect();
    });

  } catch (error) {
    console.error('Error generating resume:', error);
    await prisma.$disconnect();
  }
}

generateResume();
